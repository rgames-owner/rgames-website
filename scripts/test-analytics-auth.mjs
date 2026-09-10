import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';
import fs from 'node:fs';
import ts from 'typescript';
const source = fs.readFileSync(new URL('../lib/analytics/auth.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
function harness(response, popupError) {
  let config, requested, scopes, revokeCalled = false;
  const api = {
    initTokenClient(value) { config = value; return { requestAccessToken(options) {
      requested = options;
      if (popupError) config.error_callback({ type: popupError });
      else config.callback(response);
    } }; },
    hasGrantedAllScopes(_response, scope) { scopes = scope; return _response.scope === scope; },
    revoke(_token, done) { revokeCalled = true; done({ successful: true }); },
  };
  const window = { google: { accounts: { oauth2: api } }, setTimeout, clearTimeout };
  const exports = {};
  vm.runInNewContext(compiled, { window, exports, setTimeout, clearTimeout });
  return { exports, get config() { return config; }, get requested() { return requested; }, get scopes() { return scopes; }, get revokeCalled() { return revokeCalled; } };
}
const clientId = '123456-abcdef.apps.googleusercontent.com';
const scope = 'https://www.googleapis.com/auth/analytics.readonly';
test('only readonly scope; transient access token expires before Google expiry', async () => {
  const h = harness({ access_token: 'test-token', scope, expires_in: 3600 });
  const before = Date.now();
  const result = await h.exports.authorize(clientId);
  assert.equal(result.accessToken, 'test-token');
  assert.ok(result.expiresAt >= before + 3570000);
  assert.ok(result.expiresAt <= Date.now() + 3570000);
  assert.equal(h.config.scope, scope);
  assert.equal(h.config.include_granted_scopes, false);
  assert.equal(h.requested.prompt, 'select_account');
});
test('partial consent cannot authorize data reads', async () => {
  const h = harness({ access_token: 'test-token', scope: 'openid', expires_in: 3600 });
  await assert.rejects(h.exports.authorize(clientId), /조회 권한/);
});
test('expired response and popup cancellation reject without data', async () => {
  await assert.rejects(harness({ access_token: 'test-token', scope, expires_in: 5 }).exports.authorize(clientId), /만료/);
  await assert.rejects(harness(null, 'popup_closed').exports.authorize(clientId), /닫혔/);
});
test('invalid client IDs rejected before any Google request', async () => {
  const h = harness({});
  await assert.rejects(h.exports.authorize('https://bad.example'), /클라이언트 ID/);
  assert.equal(h.config, undefined);
});
test('disconnect revokes OAuth grant without persistence', async () => {
  const h = harness({});
  await h.exports.revoke('test-token');
  assert.equal(h.revokeCalled, true);
});

import type { InlineSpan, PolicyBlock } from '@/lib/games/types';

function parseInline(text: string): InlineSpan[] {
  const spans: InlineSpan[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      spans.push({ type: 'text', text: text.slice(last, m.index) });
    }
    const token = m[0];
    if (token.startsWith('**')) {
      spans.push({ type: 'bold', text: token.slice(2, -2) });
    } else if (token.startsWith('`')) {
      spans.push({ type: 'code', text: token.slice(1, -1) });
    } else {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (linkMatch) {
        spans.push({ type: 'link', text: linkMatch[1], href: linkMatch[2] });
      }
    }
    last = m.index + token.length;
  }
  if (last < text.length) {
    spans.push({ type: 'text', text: text.slice(last) });
  }
  return spans.length ? spans : [{ type: 'text', text }];
}

function flushList(
  blocks: PolicyBlock[],
  kind: 'ul' | 'ol',
  items: InlineSpan[][],
): void {
  if (!items.length) return;
  blocks.push({ type: kind, items: [...items] });
  items.length = 0;
}

/** Convert a subset of Markdown (headings, p, lists, tables, inline) to PolicyBlocks. */
export function fromMarkdown(md: string): PolicyBlock[] {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const blocks: PolicyBlock[] = [];
  const ulItems: InlineSpan[][] = [];
  const olItems: InlineSpan[][] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flushList(blocks, 'ul', ulItems);
      flushList(blocks, 'ol', olItems);
      i += 1;
      continue;
    }

    if (trimmed.startsWith('|')) {
      flushList(blocks, 'ul', ulItems);
      flushList(blocks, 'ol', olItems);
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i += 1;
      }
      const rows = tableLines
        .filter((l) => !/^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(l))
        .map((l) =>
          l
            .replace(/^\|/, '')
            .replace(/\|$/, '')
            .split('|')
            .map((c) => c.trim().replace(/\*\*/g, '')),
        );
      if (rows.length >= 1) {
        const [headers, ...body] = rows;
        blocks.push({ type: 'table', headers, rows: body });
      }
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushList(blocks, 'ul', ulItems);
      flushList(blocks, 'ol', olItems);
      blocks.push({ type: 'h3', text: trimmed.slice(4) });
      i += 1;
      continue;
    }

    if (trimmed.startsWith('## ')) {
      flushList(blocks, 'ul', ulItems);
      flushList(blocks, 'ol', olItems);
      blocks.push({ type: 'h2', text: trimmed.slice(3) });
      i += 1;
      continue;
    }

    const ul = /^[-*]\s+(.+)$/.exec(trimmed);
    if (ul) {
      flushList(blocks, 'ol', olItems);
      ulItems.push(parseInline(ul[1]));
      i += 1;
      continue;
    }

    const ol = /^\d+\.\s+(.+)$/.exec(trimmed);
    if (ol) {
      flushList(blocks, 'ul', ulItems);
      olItems.push(parseInline(ol[1]));
      i += 1;
      continue;
    }

    flushList(blocks, 'ul', ulItems);
    flushList(blocks, 'ol', olItems);

    const para: string[] = [trimmed];
    i += 1;
    while (i < lines.length) {
      const next = lines[i].trim();
      if (
        !next ||
        next.startsWith('#') ||
        next.startsWith('|') ||
        /^[-*]\s+/.test(next) ||
        /^\d+\.\s+/.test(next)
      ) {
        break;
      }
      para.push(next);
      i += 1;
    }
    blocks.push({ type: 'p', spans: parseInline(para.join(' ')) });
  }

  flushList(blocks, 'ul', ulItems);
  flushList(blocks, 'ol', olItems);
  return blocks;
}

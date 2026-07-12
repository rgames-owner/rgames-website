import type { InlineSpan, PolicyBlock } from '@/lib/games/types';

function Spans({ spans }: { spans: InlineSpan[] }) {
  return (
    <>
      {spans.map((s, i) => {
        if (s.type === 'text') return <span key={i}>{s.text}</span>;
        if (s.type === 'bold') return <strong key={i}>{s.text}</strong>;
        if (s.type === 'code') return <code key={i}>{s.text}</code>;
        const external = /^https?:\/\//i.test(s.href);
        return (
          <a
            key={i}
            href={s.href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {s.text}
          </a>
        );
      })}
    </>
  );
}

export default function PolicyBlocks({ blocks }: { blocks: PolicyBlock[] }) {
  return (
    <div className="policy-body">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return (
              <h2 className="policy-h2" key={i}>
                {b.text}
              </h2>
            );
          case 'h3':
            return (
              <h3 className="policy-h3" key={i}>
                {b.text}
              </h3>
            );
          case 'p':
            return (
              <p className="policy-p" key={i}>
                <Spans spans={b.spans} />
              </p>
            );
          case 'note':
            return (
              <p className="policy-note" key={i}>
                <Spans spans={b.spans} />
              </p>
            );
          case 'ul':
            return (
              <ul className="policy-list" key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>
                    <Spans spans={item} />
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol className="policy-list" key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>
                    <Spans spans={item} />
                  </li>
                ))}
              </ol>
            );
          case 'table':
            return (
              <div className="policy-table-wrap" key={i}>
                <table className="policy-table">
                  <thead>
                    <tr>
                      {b.headers.map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) => (
                          <td key={c}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

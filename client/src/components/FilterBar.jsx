const FILTERS = ['all', 'playing', 'completed', 'dropped', 'wishlist'];

export default function FilterBar({ active, onChange, counts }) {
  return (
    <div style={{
      display: 'flex',
      gap: 0,
      borderBottom: '1px solid var(--border)',
      marginBottom: 4,
    }}>
      {FILTERS.map(f => {
        const isActive = active === f;
        return (
          <button
            key={f}
            onClick={() => onChange(f)}
            style={{
              border: 'none',
              borderBottom: isActive ? '2px solid var(--text)' : '2px solid transparent',
              borderRadius: 0,
              background: 'transparent',
              color: isActive ? 'var(--text)' : 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              padding: '8px 14px 10px',
              fontWeight: isActive ? 500 : 400,
              cursor: 'pointer',
              transition: 'color 0.12s',
            }}
            onMouseEnter={e => { if (!isActive) e.target.style.color = 'var(--text)'; }}
            onMouseLeave={e => { if (!isActive) e.target.style.color = 'var(--muted)'; }}
          >
            {f}
            {counts[f] > 0 && (
              <span style={{ marginLeft: 5, color: 'var(--subtle)', fontSize: 11 }}>
                {counts[f]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

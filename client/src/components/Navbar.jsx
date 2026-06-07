import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();
  const onAdd = pathname === '/add';

  return (
    <header style={{
      borderBottom: '1px solid var(--border)',
      background: 'var(--surface)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '0 24px',
        height: 52,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link to="/" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: '-0.02em',
        }}>
          gamevault
        </Link>

        <nav style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {!onAdd && (
            <Link to="/add">
              <button className="btn-primary" style={{ padding: '6px 14px', fontSize: 12 }}>
                + Add game
              </button>
            </Link>
          )}
          {onAdd && (
            <Link to="/">
              <button style={{ padding: '6px 14px', fontSize: 12 }}>
                Back
              </button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

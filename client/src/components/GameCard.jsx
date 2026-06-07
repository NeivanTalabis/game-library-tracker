import { useNavigate } from 'react-router-dom';
import { deleteGame } from '../api';

export default function GameCard({ game, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm(`Remove "${game.title}"?`)) return;
    await deleteGame(game.id);
    onDelete(game.id);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      alignItems: 'start',
      padding: '18px 0',
      borderBottom: '1px solid var(--border)',
      gap: 16,
    }}>
      {/* Left: info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 500, fontSize: 14 }}>{game.title}</span>
          <span className={`badge ${game.status}`}>{game.status}</span>
        </div>

        <div style={{
          display: 'flex',
          gap: 16,
          color: 'var(--muted)',
          fontSize: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          {game.genre    && <span>{game.genre}</span>}
          {game.platform && <span>{game.platform}</span>}
          {game.rating   && <span>{game.rating}/10</span>}
        </div>

        {game.notes && (
          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
            {game.notes}
          </p>
        )}
      </div>

      {/* Right: actions */}
      <div style={{ display: 'flex', gap: 6, paddingTop: 2 }}>
        <button
          onClick={() => navigate(`/edit/${game.id}`)}
          style={{ padding: '4px 10px', fontSize: 12 }}
        >
          Edit
        </button>
        <button
          className="btn-danger"
          onClick={handleDelete}
          style={{ padding: '4px 10px', fontSize: 12 }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

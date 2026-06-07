import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getGame, updateGame } from '../api';
import GameForm from '../components/GameForm';

export default function EditGamePage() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const [game,    setGame]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    getGame(id)
      .then(res => setGame(res.data))
      .catch(() => setError('Could not load game.'));
  }, [id]);

  const handleSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await updateGame(id, data);
      navigate('/');
    } catch {
      setError('Failed to update.');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 520 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>Edit game</h1>
        {game && <p style={{ color: 'var(--muted)', fontSize: 13 }}>{game.title}</p>}
      </div>

      {error && <p style={{ color: 'var(--dropped)', fontSize: 13, marginBottom: 16 }}>{error}</p>}
      {!game && !error && <p style={{ color: 'var(--muted)', fontSize: 13 }}>Loading...</p>}
      {game  && <GameForm initialData={game} onSubmit={handleSubmit} loading={loading} />}

      <div style={{ marginTop: 20 }}>
        <Link to="/">
          <button style={{ fontSize: 12, padding: '6px 12px' }}>Cancel</button>
        </Link>
      </div>
    </div>
  );
}

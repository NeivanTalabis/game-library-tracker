import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGame } from '../api';
import GameForm from '../components/GameForm';

export default function AddGamePage() {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await createGame(data);
      navigate('/');
    } catch {
      setError('Failed to save. Is the server running?');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 520 }}>
      <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 28 }}>Add game</h1>
      {error && <p style={{ color: 'var(--dropped)', fontSize: 13, marginBottom: 16 }}>{error}</p>}
      <GameForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}

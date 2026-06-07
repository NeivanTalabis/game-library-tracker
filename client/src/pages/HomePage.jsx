import { useState, useEffect } from 'react';
import { getGames } from '../api';
import GameCard  from '../components/GameCard';
import FilterBar from '../components/FilterBar';

export default function HomePage() {
  const [games,   setGames]   = useState([]);
  const [filter,  setFilter]  = useState('all');
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    getGames()
      .then(res => setGames(res.data))
      .catch(() => setError('Cannot reach the server. Make sure Express is running on port 5000.'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => setGames(prev => prev.filter(g => g.id !== id));

  const counts = {
    all:       games.length,
    playing:   games.filter(g => g.status === 'playing').length,
    completed: games.filter(g => g.status === 'completed').length,
    dropped:   games.filter(g => g.status === 'dropped').length,
    wishlist:  games.filter(g => g.status === 'wishlist').length,
  };

  const visible = filter === 'all' ? games : games.filter(g => g.status === filter);

  return (
    <div>
      {/* Page heading */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>Library</h1>
        <p style={{ color: 'var(--muted)', fontSize: 13 }}>
          {games.length} {games.length === 1 ? 'game' : 'games'} tracked
        </p>
      </div>

      {loading && <p style={{ color: 'var(--muted)', fontSize: 13 }}>Loading...</p>}
      {error   && <p style={{ color: 'var(--dropped)', fontSize: 13 }}>{error}</p>}

      {!loading && !error && (
        <>
          <FilterBar active={filter} onChange={setFilter} counts={counts} />

          {visible.length === 0 ? (
            <p style={{ color: 'var(--muted)', fontSize: 13, paddingTop: 24 }}>
              Nothing here yet.
            </p>
          ) : (
            <div>
              {visible.map(game => (
                <GameCard key={game.id} game={game} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

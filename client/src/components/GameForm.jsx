import { useState } from 'react';

const EMPTY = { title: '', genre: '', platform: '', status: 'wishlist', rating: '', notes: '' };

const Label = ({ children }) => (
  <label style={{
    fontSize: 11,
    fontFamily: 'var(--font-mono)',
    color: 'var(--muted)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: 6,
  }}>
    {children}
  </label>
);

export default function GameForm({ initialData = EMPTY, onSubmit, loading }) {
  const [form, setForm] = useState({ ...EMPTY, ...initialData });

  const handle = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, rating: form.rating ? Number(form.rating) : null });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      <div>
        <Label>Title *</Label>
        <input
          name="title" value={form.title} onChange={handle}
          placeholder="Game title" required
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <Label>Genre</Label>
          <input name="genre" value={form.genre} onChange={handle} placeholder="e.g. Action RPG" />
        </div>
        <div>
          <Label>Platform</Label>
          <input name="platform" value={form.platform} onChange={handle} placeholder="e.g. PC, PS5" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <Label>Status</Label>
          <select name="status" value={form.status} onChange={handle}>
            <option value="wishlist">Wishlist</option>
            <option value="playing">Playing</option>
            <option value="completed">Completed</option>
            <option value="dropped">Dropped</option>
          </select>
        </div>
        <div>
          <Label>Rating (1–10)</Label>
          <input
            type="number" name="rating" min="1" max="10"
            value={form.rating} onChange={handle}
            placeholder="Optional"
          />
        </div>
      </div>

      <div>
        <Label>Notes</Label>
        <textarea name="notes" value={form.notes} onChange={handle} placeholder="Any thoughts..." />
      </div>

      <div style={{ paddingTop: 4 }}>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save game'}
        </button>
      </div>

    </form>
  );
}

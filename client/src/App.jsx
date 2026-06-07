import { Routes, Route } from 'react-router-dom';
import Navbar       from './components/Navbar';
import HomePage     from './pages/HomePage';
import AddGamePage  from './pages/AddGamePage';
import EditGamePage from './pages/EditGamePage';

export default function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>
        <Routes>
          <Route path="/"         element={<HomePage />} />
          <Route path="/add"      element={<AddGamePage />} />
          <Route path="/edit/:id" element={<EditGamePage />} />
        </Routes>
      </main>
    </div>
  );
}

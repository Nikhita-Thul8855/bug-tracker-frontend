import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from 'react-router-dom';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import ProjectPage from './pages/ProjectPage';
import KanbanBoard from './components/KanbanBoard'; // Import your KanbanBoard component

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Check for token in localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  // Use your actual board ID from MongoDB here!
  const boardId = '6853a7ae7bdb945ea40b7589'; // <-- your real board _id
  const projectId = '684b0dbbe01a3fb946637f34';

  return (
    <Router>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">🐞 Bug Tracker</h1>

        {loggedIn && (
          <nav className="mb-6 space-x-4">
            <Link to="/dashboard" className="text-blue-600 hover:underline">
              Dashboard
            </Link>
            <Link to="/new-ticket" className="text-blue-600 hover:underline">
              New Ticket
            </Link>
            <Link to="/tickets" className="text-blue-600 hover:underline">
              All Tickets
            </Link>
            <Link to={`/project/${projectId}`} className="text-blue-600 hover:underline">
              Project Page
            </Link>
            <Link to="/kanban" className="text-blue-600 hover:underline">
              Kanban Board
            </Link>
            <button onClick={handleLogout} className="text-red-600 ml-4">
              Logout
            </button>
          </nav>
        )}

        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={loggedIn ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/new-ticket"
            element={
              loggedIn ? <TicketForm projectId={projectId} /> : <Navigate to="/" />
            }
          />
          <Route
            path="/tickets"
            element={
              loggedIn ? <TicketList projectId={projectId} /> : <Navigate to="/" />
            }
          />
          <Route
            path="/project/:projectId"
            element={
              loggedIn ? <ProjectPage projectId={projectId} /> : <Navigate to="/" />
            }
          />
          <Route
            path="/kanban"
            element={
              loggedIn ? <KanbanBoard boardId={boardId} /> : <Navigate to="/" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
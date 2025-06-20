import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4 fixed">
      <h2 className="text-2xl font-bold mb-6">Bug Tracker</h2>
      <nav className="flex flex-col space-y-4">
        <Link to="/dashboard" className="hover:text-yellow-400">Dashboard</Link>
        <Link to="/tickets" className="hover:text-yellow-400">Tickets</Link>
        <Link to="/projects" className="hover:text-yellow-400">Projects</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
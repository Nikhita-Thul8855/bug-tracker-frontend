import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between">
        <div className="font-bold text-xl">BugTracker</div>
        <div className="space-x-4">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/new-ticket">New Ticket</Link>
          <Link to="/">Logout</Link>
        </div>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;


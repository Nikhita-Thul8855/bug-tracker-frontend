import React, { useEffect, useState } from 'react';
import api from '../api/api';

const ProjectTickets = ({ projectId: propProjectId }) => {
  // If you want to allow the user to enter a project ID, use local state:
  const [projectId, setProjectId] = useState(propProjectId || '');

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Filter and search states
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      if (!projectId) return;
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (statusFilter) params.append('status', statusFilter);
        if (priorityFilter) params.append('priority', priorityFilter);
        if (assigneeFilter) params.append('assignedTo', assigneeFilter);
        if (search) params.append('search', search);

        const res = await api.get(`/tickets/project/${projectId}?${params.toString()}`);
        setTickets(res.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch tickets');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [projectId, statusFilter, priorityFilter, assigneeFilter, search]);

  // Get unique assignees for the dropdown (use name or email if available)
  const assignees = [
    ...new Set(
      tickets
        .map(ticket =>
          typeof ticket.assignedTo === 'object'
            ? ticket.assignedTo?.name || ticket.assignedTo?.email
            : ticket.assignedTo
        )
        .filter(Boolean)
    ),
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Project Tickets</h2>
      {/* Optional: Project ID input */}
      {!propProjectId && (
        <input
          type="text"
          placeholder="Enter Project ID"
          value={projectId}
          onChange={e => setProjectId(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
      )}
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search tickets..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      {/* Dropdown filters */}
      <div className="flex space-x-2 mb-4">
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select value={assigneeFilter} onChange={e => setAssigneeFilter(e.target.value)}>
          <option value="">All Assignees</option>
          {assignees.map(assignee => (
            <option key={assignee} value={assignee}>{assignee}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div>Loading tickets...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : tickets.length === 0 ? (
        <p>No tickets found for this project.</p>
      ) : (
        <ul className="space-y-2">
          {tickets.map(ticket => (
            <li key={ticket._id} className="border p-2 rounded">
              <strong>{ticket.title}</strong>
              <div>{ticket.description}</div>
              <div className="text-xs text-gray-500">
                Status: {ticket.status} | Priority: {ticket.priority} | Assigned To: {
                  typeof ticket.assignedTo === 'object'
                    ? ticket.assignedTo?.name || ticket.assignedTo?.email || 'Unassigned'
                    : ticket.assignedTo || 'Unassigned'
                }
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectTickets;
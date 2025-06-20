import React, { useEffect, useState } from 'react';
import api from '../api/api';
import TicketForm from './TicketForm';

const TicketList = ({ projectId }) => {
  const [tickets, setTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [search, setSearch] = useState('');
  const [editingTicket, setEditingTicket] = useState(null);

  // Get current user ID (assumes you store it in localStorage after login)
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const params = new URLSearchParams();
        if (statusFilter) params.append('status', statusFilter);
        if (priorityFilter) params.append('priority', priorityFilter);
        if (assigneeFilter) params.append('assignedTo', assigneeFilter);
        if (search) params.append('search', search);

        const res = await api.get(`/tickets/project/${projectId}?${params.toString()}`);
        setTickets(res.data);
      } catch (err) {
        // Optionally handle error
      }
    };
    if (projectId) fetchTickets();
  }, [projectId, statusFilter, priorityFilter, assigneeFilter, search, editingTicket]);

  const handleDelete = async (ticketId) => {
    const confirmed = window.confirm('Are you sure you want to delete this ticket?');
    if (!confirmed) return;
    try {
      await api.delete(`/tickets/${ticketId}`);
      setTickets(tickets.filter(ticket => ticket._id !== ticketId));
      alert('✅ Ticket deleted.');
    } catch (err) {
      alert('❌ Failed to delete ticket.');
    }
  };

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

  if (!projectId) return <div>Select a project to view tickets.</div>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Tickets</h2>
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
      {tickets.length === 0 ? (
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
              {/* Only allow creator to edit/delete */}
              {String(ticket.creator) === String(currentUserId) && (
                <>
                  <button
                    className="text-blue-600 underline text-sm mt-1 mr-2"
                    onClick={() => setEditingTicket(ticket)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 underline text-sm mt-1"
                    onClick={() => handleDelete(ticket._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {editingTicket && (
        <div className="mt-4">
          <TicketForm
            ticket={editingTicket}
            projectId={projectId}
            onSave={() => setEditingTicket(null)}
          />
        </div>
      )}
    </div>
  );
};

export default TicketList;
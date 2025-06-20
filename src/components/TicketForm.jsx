import React, { useState, useEffect } from 'react';
import api from '../api/api';

const TicketForm = ({ projectId, ticket, onSave }) => {
  const [title, setTitle] = useState(ticket ? ticket.title : '');
  const [description, setDescription] = useState(ticket ? ticket.description : '');
  const [assignedTo, setAssignedTo] = useState(ticket ? ticket.assignedTo : '');
  const [priority, setPriority] = useState(ticket ? ticket.priority : 'Medium');
  const [status, setStatus] = useState(ticket ? ticket.status : 'To Do');

  useEffect(() => {
    if (ticket) {
      setTitle(ticket.title || '');
      setDescription(ticket.description || '');
      setAssignedTo(ticket.assignedTo || '');
      setPriority(ticket.priority || 'Medium');
      setStatus(ticket.status || 'To Do');
    } else {
      setTitle('');
      setDescription('');
      setAssignedTo('');
      setPriority('Medium');
      setStatus('To Do');
    }
  }, [ticket]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (ticket && ticket._id) {
        // Edit mode: update ticket
        await api.put(`/tickets/${ticket._id}`, {
          title,
          description,
          assignedTo,
          priority,
          status,
          project: projectId,
        });
        alert('✅ Ticket updated successfully!');
      } else {
        // Create mode: new ticket
        await api.post('/tickets', {
          title,
          description,
          assignedTo,
          priority,
          status,
          project: projectId,
        });
        alert('✅ Ticket created successfully!');
        setTitle('');
        setDescription('');
        setAssignedTo('');
        setPriority('Medium');
        setStatus('To Do');
      }
      if (onSave) onSave();
    } catch (error) {
      console.error('❌ Error saving ticket:', error.response?.data?.message || error.message);
      alert('❌ Error: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">{ticket ? 'Edit Ticket' : 'Create New Ticket'}</h2>

      <input
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />

      <textarea
        className="w-full p-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />

      <input
        className="w-full p-2 border rounded"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        placeholder="Assigned To (User ID)"
        required
      />

      <select
        className="w-full p-2 border rounded"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select
        className="w-full p-2 border rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {ticket ? 'Update Ticket' : 'Submit Ticket'}
        </button>
        {onSave && (
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={onSave}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TicketForm;
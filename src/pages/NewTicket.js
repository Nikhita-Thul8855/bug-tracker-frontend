import { useState } from 'react';
import api from '../api/api';
import Layout from '../components/Layout';

const NewTicket = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    project: '',
    assignedTo: '',
    priority: 'Medium',
    status: 'To Do',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting this ticket:', form);
    try {
      await api.post('/tickets', form);
      alert('Ticket created successfully');
      setForm({
        title: '',
        description: '',
        project: '',
        assignedTo: '',
        priority: 'Medium',
        status: 'To Do',
      });
    } catch (err) {
      console.error('Error creating ticket:', err.message);
      alert('Error creating ticket');
    }
  };

  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-4">Create New Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="input"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="input"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>
        <input
          className="input"
          placeholder="Project ID"
          value={form.project}
          onChange={(e) => setForm({ ...form, project: e.target.value })}
        />
        <input
          className="input"
          placeholder="Assigned To (User ID)"
          value={form.assignedTo}
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
        />
        <select
          className="input"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select
          className="input"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Create Ticket</button>
      </form>
    </Layout>
  );
};

export default NewTicket;
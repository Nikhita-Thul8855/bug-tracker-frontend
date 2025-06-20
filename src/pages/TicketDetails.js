import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import CommentSection from '../components/CommentSection';

const TicketDetails = () => {
  const { id } = useParams(); // Get ticket ID from URL param
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await API.get(`/tickets/${id}`);
        setTicket(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch ticket');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading) return <p className="p-4">Loading ticket...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{ticket.title}</h2>
      <p className="text-gray-700 mb-4">{ticket.description}</p>
      <p className="text-sm text-gray-500">Status: {ticket.status}</p>

      {/* Comments */}
      <CommentSection ticketId={ticket._id} />
    </div>
  );
};

export default TicketDetails;

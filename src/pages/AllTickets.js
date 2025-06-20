import { useEffect, useState } from 'react';
import api from '../api/ticket';

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get('/');
      setTickets(res.data);
    };
    fetch();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">All Tickets</h2>
      <ul>
        {tickets.map((t) => (
          <li key={t._id}>{t.title} - {t.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default AllTickets;
import React, { useEffect, useState } from 'react';
import api from '../api/api';

const KanbanBoard = ({ boardId }) => {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await api.get(`/boards/${boardId}`);
        setBoard(res.data);
      } catch (err) {
        console.error('Error fetching board:', err);
      }
    };
    fetchBoard();
  }, [boardId]);

  if (!board) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{board.name}</h2>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {board.columns && board.columns.length > 0 ? (
          board.columns.map(column => (
            <div key={column._id} style={{ minWidth: 250, background: '#f3f3f3', padding: 16, borderRadius: 8 }}>
              <h3 className="font-semibold mb-2">{column.name}</h3>
              <ul>
                {column.cards && column.cards.length > 0 ? (
                  column.cards.map(card => (
                    <li key={card._id} style={{ background: '#fff', margin: '8px 0', padding: 8, borderRadius: 4 }}>
                      <strong>{card.title}</strong>
                      <div>{card.description}</div>
                    </li>
                  ))
                ) : (
                  <li style={{ color: '#888' }}>No cards</li>
                )}
              </ul>
            </div>
          ))
        ) : (
          <div>No columns found for this board.</div>
        )}
      </div>
    </div>
  );
};

export default KanbanBoard;
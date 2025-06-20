// client/src/components/CommentSection.js
import { useEffect, useState } from 'react';
import API from '../api';

const CommentSection = ({ ticketId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch comments for the ticket
  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/ticket/${ticketId}`);
      setComments(res.data);
    } catch (err) {
      console.error('Error loading comments:', err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    if (ticketId) {
      fetchComments();
    }
  }, [ticketId]);

  // Handle new comment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/comments', { text, ticketId });
      setText('');
      fetchComments();
    } catch (err) {
      console.error('Error posting comment:', err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-lg font-semibold mb-2">💬 Comments</h3>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border rounded p-2"
          placeholder="Add a comment"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      <div className="mt-4 space-y-2">
        {comments.map((comment) => (
          <div key={comment._id} className="bg-gray-100 p-2 rounded">
            <p className="text-sm">{comment.text}</p>
            <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;

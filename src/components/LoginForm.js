import { useState } from 'react';
import API from '../api/api'; // ✅ Use the configured Axios instance

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Prevent default form reload

    try {
      const response = await API.post('/auth/login', {
        email,
        password,
      });

      console.log('✅ Login successful:', response.data);

      // Save token to localStorage
      localStorage.setItem('token', response.data.token);

      setError('');
      if (onLogin) onLogin(); // 🔁 Trigger login callback to App.js
    } catch (err) {
      console.error('❌ Login error:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Login
      </button>

      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};

export default LoginForm;
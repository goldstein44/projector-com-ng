// frontend/pages/admin/login.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAdmin } from '../../../lib/adminAuth';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false); // ← NEW: Prevent SSR crash
  const router = useRouter();

  // ← NEW: Only run client-side code after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!isClient) return; // Safety

    if (isAdmin(username, password)) {
      try {
        localStorage.setItem("adminAuth", "true");
        router.push("/admin");
      } catch (err) {
        setError("Login failed. Try again.");
      }
    } else {
      setError("Wrong username or password");
    }
  };

  // ← NEW: Show loading placeholder until client is ready
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-10 rounded-xl shadow-lg w-96 text-center">
          <p className="text-xl">Loading admin login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">
          Admin Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {error && <p className="text-red-600 text-center font-medium">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-4 rounded-lg hover:bg-blue-800 transition font-bold text-lg"
          >
            Login as goldstein
          </button>
        </form>
      </div>
    </div>
  );
}
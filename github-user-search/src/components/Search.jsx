

import React, { useState } from 'react';
import { fetchUserData, fetchUsersAdvanced } from '../services/githubService';

const Search = () => {

  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUsers([]);
    try {
      const results = await fetchUsersAdvanced({
        username: username.trim(),
        location: location.trim(),
        minRepos: minRepos ? parseInt(minRepos) : undefined,
      });
      setUsers(results);
      if (results.length === 0) setError('Looks like we cant find the user');
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-50 to-blue-100 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">GitHub User Search</h1>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="GitHub username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
          />
          <input
            type="text"
            placeholder="Location (optional)"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
          />
          <input
            type="number"
            min="0"
            placeholder="Min repositories (optional)"
            value={minRepos}
            onChange={e => setMinRepos(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
          />
          <button type="submit" className="bg-blue-600 text-white font-semibold rounded-lg px-6 py-2 hover:bg-blue-700 transition-all shadow">Search</button>
        </form>
        {loading && <p className="text-blue-600 text-center font-medium">Loading...</p>}
        {error && <p className="text-red-600 text-center font-medium">{error}</p>}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {users.map(user => (
            <div key={user.id} className="flex items-center gap-5 p-5 bg-white rounded-xl shadow hover:shadow-lg transition-all border border-gray-100">
              <img src={user.avatar_url} alt={user.login} className="w-20 h-20 rounded-full border-2 border-blue-200 object-cover" />
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-800">{user.login}</p>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">View Profile</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;

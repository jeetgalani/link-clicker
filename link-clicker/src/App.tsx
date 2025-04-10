import React, { useState } from 'react';
import LinkClicker from './LinkClicker';

const App = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'mynameisgibby') {
      setAuthed(true);
    } else {
      alert('Incorrect password 🤷‍♂️');
    }
  };

  if (!authed) {
    return (
      <div className="max-w-sm mx-auto mt-20 p-6 shadow-xl rounded-xl border bg-white text-center">
        <h1 className="text-xl font-semibold mb-4">🔐 Enter Password</h1>
        <input
          type="password"
          placeholder="Enter password"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Unlock
        </button>
      </div>
    );
  }

  return <LinkClicker />;
};

export default App;

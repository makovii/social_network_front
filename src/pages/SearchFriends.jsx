import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SearchFriends.css';

const SearchFriends = ({ accessToken }) => {
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSearch = async (event) => {
    setEmail(event.target.value);
    if (event.target.value === '') {
      setUsers([]);
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:3000/user/searchUsersByEmail',
        { email: event.target.value },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userEmail) => {
    setLoading(true);
    setMessage('');

    try {
      await axios.post(
        'http://localhost:3000/user/subscribe',
        { email: userEmail },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setMessage('Followed successfully!');
    } catch (error) {
      setMessage('Error following user.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-users">
      <h1>Search Friends</h1>
      <input
        type="text"
        value={email}
        onChange={handleSearch}
        placeholder="Enter email to search..."
      />
      <div className="loading-placeholder">
        {loading && <p className="loading-text">Loading...</p>}
      </div>
      {users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.email}>
              {user.email}
              <button onClick={() => handleFollow(user.email)}>Subscribe</button>
            </li>
          ))}
        </ul>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SearchFriends;

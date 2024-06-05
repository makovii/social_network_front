import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreatePublication.css';

const CreatePublication = ({ accessToken }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        'http://localhost:3000/user/createPublication',
        { text },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage('Publication created successfully!');
    } catch (error) {
      setMessage('Error creating publication.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-publication">
      <h1>Create New Publication</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your publication text here..."
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreatePublication;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/FriendsList.css';

const FriendsList = ({ accessToken }) => {
  const [friends, setFriends] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/getSubscriptions', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setFriends(response.data);
        setInitialLoading(false);
      } catch (error) {
        console.error('Error fetching friends:', error);
        setInitialLoading(false);
      }
    };

    fetchFriends();
  }, [accessToken]);

  const handleUnsubscribe = async (userEmail) => {
    setActionLoading(true);
    setMessage('');
    try {
      await axios.post(
        `http://localhost:3000/user/unsubscribe`,
        { email: userEmail },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setFriends(friends.map(friend => 
        friend.email === userEmail ? { ...friend, isSubscribed: false } : friend
      ));
      setMessage('Unsubscribed successfully!');
    } catch (error) {
      setMessage('Error unsubscribing user.');
      console.error('Error:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSubscribe = async (userEmail) => {
    setActionLoading(true);
    setMessage('');
    try {
      await axios.post(
        `http://localhost:3000/user/subscribe`,
        { email: userEmail },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setFriends(friends.map(friend => 
        friend.email === userEmail ? { ...friend, isSubscribed: true } : friend
      ));
      setMessage('Subscribed successfully!');
    } catch (error) {
      setMessage('Error subscribing user.');
      console.error('Error:', error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="friends-list">
      <h1>Your Friends</h1>
      {initialLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <ul>
          {friends.map((friend) => (
            <li key={friend.email}>
              {friend.email}
              {friend.isSubscribed !== false ? (
                <button onClick={() => handleUnsubscribe(friend.email)} disabled={actionLoading}>Unsubscribe</button>
              ) : (
                <button onClick={() => handleSubscribe(friend.email)} disabled={actionLoading}>Subscribe</button>
              )}
            </li>
          ))}
        </ul>
      )}
      {actionLoading && <p className="loading">Loading...</p>}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default FriendsList;

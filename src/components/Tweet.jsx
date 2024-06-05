import React from 'react';
import './styles/Tweet.css';

const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${hours}:${minutes}`;
  };
  
  const Tweet = ({ user, publication, handleLike }) => {
    return (
      <div className="news-item">
        <span><strong>{user.email}</strong></span>
        <span>Content: {publication.text}</span>
        <br />
        <span>Published at: {formatDateTime(publication.time)}</span>
        <br />
        <button
          onClick={() => handleLike(publication.uuid, publication.isLiked)}
          className={publication.isLiked ? 'liked' : 'unliked'}
        >
          {publication.isLiked ? 'Unlike' : 'Like'}
        </button>
      </div>
    );
  };
  
  export default Tweet;

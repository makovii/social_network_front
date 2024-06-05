import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Feed.css';
import Tweet from '../components/Tweet.jsx';

const Feed = ({ accessToken }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/getNews', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setNews(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [accessToken]);

  const handleLike = async (publicationUuid, isLiked) => {
    try {
      const url = isLiked
        ? `http://localhost:3000/publication/unlikePub`
        : `http://localhost:3000/publication/likePub`;

      await axios.post(url, {
        uuidPub: publicationUuid
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setNews((prevNews) =>
        prevNews.map((item) =>
          item.publication.uuid === publicationUuid
            ? {
                ...item,
                publication: { ...item.publication, isLiked: !isLiked },
              }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  return (
    <div className="feed">
      <h1>News Feed</h1>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          {news.map(({ user, publication }, index) => (
            <Tweet
                key={index}
                user={user}
                publication={publication}
                handleLike={handleLike}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Feed;

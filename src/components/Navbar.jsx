import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/preview">Preview</Link></li>
        <li><Link to="/feed">Feed</Link></li>
        <li><Link to="/create-publication">Create Pub</Link></li>
        <li><Link to="/search-friends">Search Friends</Link></li>
        <li><Link to="/friends">Friends</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

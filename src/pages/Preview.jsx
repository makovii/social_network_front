import React, { useState } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Preview = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSignUpWithGoogle = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogOut = () => {
    onLogin(null);
  };

  return (
    <div className="app">
      <div className="content">
        <h1>Welcome to Social Network</h1>
        <div className="button-container">
          <Button text="Sign Up with Google" onClick={handleSignUpWithGoogle} />
          <Button text="Sign Up" onClick={handleSignUp} />
          <Button text="Login" onClick={handleLogin} />
          <Button text="Log Out" onClick={handleLogOut} />
        </div>
      </div>
    </div>
  );
};

export default Preview;

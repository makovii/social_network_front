import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import '../styles/App.css';
import Preview from './Preview';
import Feed from './Feed';
import Navbar from '../components/Navbar.jsx';
import CreatePublication from './CreatePublication.jsx';
import SearchFriends from './SearchFriends.jsx';
import FriendsList from './FriendsList.jsx';
import Registration from './Registration.jsx';
import Login from './Login.jsx';
import PrivateRoute from '../components/PrivateRoute.jsx';

const App = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const handleLogin = (token) => {
        setAccessToken(token);
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('accessToken');
        if (token) {
            setAccessToken(token);
            localStorage.setItem('accessToken', token);
            window.history.replaceState({}, document.title, window.location.pathname);
            setLoading(false);
        } else {
            const storedToken = localStorage.getItem('accessToken');
            if (storedToken) {
            setAccessToken(storedToken);
            }
            setLoading(false);
        }
    }, []);

    if (loading) {
    return <div className="loading">Loading...</div>;
    }

    return (
        <BrowserRouter>
            <Navbar/>
            <div className="content">
                <Routes>
                <Route path="/preview" element={<Preview onLogin={handleLogin} />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route 
                        path="/feed" 
                        element={
                            <PrivateRoute accessToken={accessToken}>
                                <Feed accessToken={accessToken} />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/create-publication" 
                        element={
                            <PrivateRoute accessToken={accessToken}>
                                <CreatePublication accessToken={accessToken} />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/search-friends" 
                        element={
                            <PrivateRoute accessToken={accessToken}>
                                <SearchFriends accessToken={accessToken} />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/friends" 
                        element={
                            <PrivateRoute accessToken={accessToken}>
                                <FriendsList accessToken={accessToken} />
                            </PrivateRoute>
                        } 
                    />
                </Routes>
            </div>
        </BrowserRouter>
    )
  }

export default App;

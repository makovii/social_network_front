import React, { useState } from 'react';
import axios from 'axios';
import '../styles/App.css';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email,
                password,
            });

            if (response.status === 200) {
                const { accessToken } = response.data;
                onLogin(accessToken);
                navigate('/feed');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="app">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button text="Login"/>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Login;

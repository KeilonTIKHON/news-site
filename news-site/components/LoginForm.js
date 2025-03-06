'use client';

import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { email, password });
            console.log(response.data)
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
            className='email'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
            className='password'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className='loginpage_button' type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
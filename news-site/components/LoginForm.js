'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await signIn('credentials', { email, password, redirect: false });
        if (result.error) {
          alert(result.error);
        } else {
          alert("Login successful!");
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
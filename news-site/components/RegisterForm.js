'use client';

import { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              mutation {
                register(name: "${name}", email: "${email}", password: "${password}")
              }
            `,
          }),
        });
        const data = await response.json();
        if (data.errors) {
          alert(data.errors[0].message);
        } else {
          alert("User registered successfully!");
        }
      
    };

    return (
        <form onSubmit={handleRegister}>
            <input
                className='rname'
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
            className='remail'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
            className='rpassword'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className='registerpage_button' type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
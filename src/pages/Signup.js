import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Sign() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    async function handleLogin() {
        if (!name || !password) {
            alert('Please fill out both the username and password fields.');
            return; 
        }

        try {
            const response = await fetch('http://localhost:8080/testcronpaymaa/testing/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    password: password
                }),
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Success: ' + result.message);
                navigate('/login')
            } else {
                console.log('Error: ' + result.message);
            }
        } catch (error) {
            console.log('Error: ' + error.message);
        }
    }

    return (
        <>
            <center>
                <h1>
                    Signup Page
                </h1>
                <label for="username">Username:</label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} /><br />
                <label for="username" >Password:</label>
                <input type='number' value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                <button onClick={handleLogin}>Signup</button>

            </center>
        </>
    )
}
export default Sign;
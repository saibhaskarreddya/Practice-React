import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();



    async function handleLogin() {
        if (!name || !password) {
            alert('Please fill out both the username and password fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/testcronpaymaa/testing/login', {
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
                if (result.status == '200') {
                    console.log('Success: ' + result.status);
                    navigate('/navbar')
                }
                else{
                    alert("Invalid Credentials")
                }

            } else {
                console.log('Error: ' + result.message);
            }
        } catch (error) {
            console.log('Error: ' + error.message);
        }
    }

    function handleSignup() {
        navigate('/sign')
    }

    return (
        <>
            <center>
                <h1>
                    Login page
                </h1>
                <label for="username">Username:</label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} /><br />
                <label for="username" >Password:</label>
                <input type='number' value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleSignup}>signup</button>

            </center>
        </>
    )
}
export default Login;
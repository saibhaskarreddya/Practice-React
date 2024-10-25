import React, { useState, useEffect } from 'react';
function Save() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [result, setResult] = useState('')


    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch('http://localhost:8080/testcronpaymaa/testing/getdata')
            .then(response => {
                // Log the response for debugging
                console.log('Response:', response);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                return response.json();
            })
            .then(data => {
                console.log('Data:', data);
                setResult(data)
                // Process your data here
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }, []);


    async function handleChange() {
        try {
            const response = await fetch('http://localhost:8080/testcronpaymaa/testing/savename', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name }),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Success: ' + result.message);
            } else {
                setMessage('Error: ' + result.message);
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    }
    return (
        <div>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={handleChange}>Save</button>
            <ul>
                {result.data && result.data.map((item, index) => (
                    <li key={index}>{item.name}</li> // Assuming each item has a 'name' property
                ))}
            </ul>

        </div>
    )
}

export default Save;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayStatus from './DisplayStatus';
import { API_BASE } from '../api';

function LoginForm()
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e)
    {
        e.preventDefault();

        if (!username)
        {
            setMessage("Username cannot be empty.");
            setMessageType("error");
            return;
        }

        if (!password)
        {
            setMessage("Password cannot be empty.");
            setMessageType("error");
            return;
        }

        // Submit to backend
        fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setMessage(data.message);
                setMessageType("success");
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('username', data.username);
                setTimeout(() => {
                    navigate('/flavors');
                }, 1000);
            } else {
                setMessage(data.message);
                setMessageType("error");
            }
        })
        .catch(() => {
            setMessage("Error logging in.");
            setMessageType("error");
        });
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Login</h1>
            <form id="login_form">
                <label htmlFor="username">Username</label><br/>
                <input type="text" id="username" name="username" 
                value={username} onChange={(e) => setUsername(e.target.value)}/><br/><br/>

                <label htmlFor="password">Password</label><br/>
                <input type="password" id="password" name="password" 
                value={password} onChange={(e) => setPassword(e.target.value)}/><br/><br/>

                <button type="submit" onClick={handleSubmit}>Login</button>
                <br/>
                <a href="#" onClick={() => navigate('/signup')}>Don't have an account? Signup</a>
                {message && <DisplayStatus type={messageType} message={message} />}
            </form>
        </div>
    );
}
export default LoginForm;
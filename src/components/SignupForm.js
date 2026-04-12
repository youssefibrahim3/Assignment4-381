import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayStatus from './DisplayStatus';
import { API_BASE } from '../api';

function SignupForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (!username || !email || !password || !confirmPassword) {
            setMessage("All fields are required.");
            setMessageType("error");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            setMessageType("error");
            return;
        }

        // Basic frontend validation
        if (username.length < 3 || username.length > 20) {
            setMessage("Username must be between 3 and 20 characters.");
            setMessageType("error");
            return;
        }

        if (!username[0].match(/[a-zA-Z]/)) {
            setMessage("Username must begin with a letter.");
            setMessageType("error");
            return;
        }

        if (!username.match(/^[a-zA-Z0-9_-]+$/)) {
            setMessage("Username may contain letters, numbers, underscores and hyphens only.");
            setMessageType("error");
            return;
        }

        if (!email.includes('@')) {
            setMessage("Invalid email address.");
            setMessageType("error");
            return;
        }

        if (password.length < 8) {
            setMessage("Password must be at least 8 characters long.");
            setMessageType("error");
            return;
        }

        // Check for uppercase, lowercase, digit, special
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecial = /[^a-zA-Z0-9]/.test(password);

        if (!(hasUpper && hasLower && hasDigit && hasSpecial)) {
            setMessage("Password must contain uppercase, lowercase, number, and special characters.");
            setMessageType("error");
            return;
        }

        // Submit to backend
        fetch(`${API_BASE}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setMessage(data.message);
                setMessageType("success");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setMessage(data.message);
                setMessageType("error");
            }
        })
        .catch(() => {
            setMessage("Error signing up.");
            setMessageType("error");
        });
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Signup</h1>
            <form id="signup_form">
                <label htmlFor="username">Username</label><br/>
                <input type="text" id="username" name="username" 
                value={username} onChange={(e) => setUsername(e.target.value)}/><br/><br/>

                <label htmlFor="email">Email</label><br/>
                <input type="email" id="email" name="email" 
                value={email} onChange={(e) => setEmail(e.target.value)}/><br/><br/>

                <label htmlFor="password">Password</label><br/>
                <input type="password" id="password" name="password" 
                value={password} onChange={(e) => setPassword(e.target.value)}/><br/><br/>

                <label htmlFor="confirmPassword">Confirm Password</label><br/>
                <input type="password" id="confirmPassword" name="confirmPassword" 
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/><br/><br/>

                <button type="submit" onClick={handleSubmit}>Signup</button>
                <br/>
                <a href="#" onClick={() => navigate('/login')}>Already have an account? Login</a>
                {message && <DisplayStatus type={messageType} message={message} />}
            </form>
        </div>
    );
}

export default SignupForm;
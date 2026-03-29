import React, { useState, useEffect } from 'react'; // This covers everything
import DisplayStatus from './DisplayStatus';

function LoginForm()
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(() => {
                setMessage("Error fetching users");
                setMessageType("error");
            });
    }, []);

    useEffect(() => {
        if (messageType === "success")
        {
            setTimeout(() => {
                window.location.href = "/flavors";
            }, 2000);
        }
    }, [messageType]);

    function handleSubmit(button)
    {
        button.preventDefault(); //apparently this prevents page refresh

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

        if (password.length < 8)
        {
            setMessage("Password must be at least 8 characters.");
            setMessageType("error");
            return;
        }

        const foundUser = users.find(
            (user) =>
                user.username === username && user.email === password
        )
        if (foundUser)
        {
            setMessage("Login successful!");
            setMessageType("success");
        } else {
            setMessage("Invalid username or password");
            setMessageType("error");
        }
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Login</h1>
            <form id="login_form">
                <label for="username">Username</label><br/>
                <input type="text" id="username" name="username" 
                onChange={(e) => setUsername(e.target.value)}/><br/><br/>

                <label for="password">Password (Email)</label><br/>
                <input type="password" id="password" name="password" 
                onChange={(e) => setPassword(e.target.value)}/><br/><br/>

                <button type="submit" onClick={handleSubmit}>Login</button>
                <br></br>
                <a>Forgot Password?</a>
                {message && <DisplayStatus type={messageType} message={message} />}
            </form>
        </div>
    );
}
export default LoginForm;
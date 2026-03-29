
import React from 'react'
import {UseState, UseEffect} from 'react'
import DisplayStatus from './DisplayStatus'
function LoginForm()
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    useEffect(() => {

    }, []);

    return (
        <div>
            <form id="login_form">
                <label for="username">Username</label><br/>
                <input type="text" id="username" name="username" required/><br/><br/>

                <label for="password">Password (Email)</label><br/>
                <input type="password" id="password" name="password" required/><br/><br/>

                <div>
                    <input type="checkbox" id="forgot_password" name="forgot_password" disabled/>
                    <label for="forgot_password">Forgot Password?</label><br/><br/>
                </div>

                <button id="loginbutton">Login</button>

            </form>
        </div>
    );
}
export default LoginForm;
import { useState } from "react";

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(e) {
        e.preventDefault();

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((response) => {
            if (response.status === 200) {
                props.setLoggedIn(true);
            }
        });
    }

    return (
        <form>
            <input
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={(e) => handleLogin(e)}>Login</button>
        </form>
    );
}

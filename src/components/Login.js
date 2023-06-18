import { useState } from "react";

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (event) => {
    event.preventDefault();
    const userObj = {
      username,
      password,
    };
    handleLogin(userObj);
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <div>
          username: {""}
          <input
            id="username-input"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password: {""}
          <input
            id="password-input"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-btn" type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;

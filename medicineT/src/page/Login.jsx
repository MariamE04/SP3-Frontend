import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate(); // til redirect efter login

  const onChange = (e) => setCredentials({ ...credentials, [e.target.id]: e.target.value });

  const performLogin = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.username, credentials.password);
      setCredentials({ username: "", password: "" });
      navigate("/"); // redirect til f.eks. /home eller medicines
    } catch {
      alert("Login failed. Check username and password.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={performLogin}>
        <input
          id="username"
          value={credentials.username}
          onChange={onChange}
          placeholder="Username"
          autoComplete="username"
        />
        <input
          id="password"
          type="password"
          value={credentials.password}
          onChange={onChange}
          placeholder="Password"
          autoComplete="current-password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

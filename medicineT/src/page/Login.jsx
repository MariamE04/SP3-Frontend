import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { useSearchParams } from "react-router-dom";
import styles from "../style/Login.module.css";


function Login() {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate(); // til redirect efter login
   const [searchParams] = useSearchParams();

  const reason = searchParams.get("reason");
  const onChange = (e) => setCredentials({ ...credentials, [e.target.id]: e.target.value });

  const performLogin = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.username, credentials.password);
      setCredentials({ username: "", password: "" });
      navigate("/");
    } catch {
      alert("Login failed. Check username and password.");
    }
  };

  return (
    <div className={styles.loginForm}>
       {reason === "expired" && (
      <p style={{ color: "red", marginBottom: "1rem" }}>
        Session expired - please log in again
      </p>
    )}
    
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

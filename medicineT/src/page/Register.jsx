import { useState } from "react";
import { useNavigate } from "react-router-dom";
import facade from "../utils/authFacade";
import styles from "../style/FormRegister.module.css";

function Register(){
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value,
    });
  };

  const performRegistere = async (e) => {
   e.preventDefault();

    try {
      await facade.register(
        credentials.username,
        credentials.password
      );

      alert("User created – you can now log in");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    }
  };
   

  return (
    <div className={styles.registerForm}>
      <h2>Signup</h2>
      <p>Please fill in this form to create an account.</p>

      <form onSubmit={performRegistere}>
        <input
          id="username"
          value={credentials.username}
          onChange={onChange}
          placeholder="Username"
          autoComplete="username"
          required
        />
        <input
          id="password"
          type="password"
          value={credentials.password}
          onChange={onChange}
          placeholder="Password"
          autoComplete="current-password"
          required
        />
        <p>By creating an account you agree to our Terms & Privacy.</p>

        <div className={styles.buttons}>
           <button type="submit" className={styles.primaryBtn}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
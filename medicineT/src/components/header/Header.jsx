import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import styles from "./header.module.css";

function Header() {
  const { loggedIn, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.leftLinks}>
          <NavLink to="/" className={styles.link}>Home</NavLink>
          <NavLink to="/Medicine" className={styles.link}>Medicine</NavLink>
        </div>

        <div className={styles.rightLinks}>
          {!loggedIn ? (
            <>
              <NavLink to="/Login" className={styles.link}>Login</NavLink>
              <NavLink to="/Register" className={styles.link}>Register</NavLink>
            </>
          ) : (
            <button onClick={logout} className={styles.logoutButton}>Logout</button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";
import styles from './Navbar.module.css';

const NavBar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <NavLink className={styles.brand} to="/">
        Drag<span>o</span>nBall bl<span>o</span>g
      </NavLink>

      <div
        className={`${styles.menu_icon} ${menuOpen ? styles.open : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`${styles.links_list} ${menuOpen ? styles.menu_open : ''}`}>
        <li>
          <NavLink to={'/'} className={({ isActive }) => (isActive ? styles.active : '')} onClick={closeMenu}>Home</NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink to={'/login'} className={({ isActive }) => (isActive ? styles.active : '')} onClick={closeMenu}>Login</NavLink>
            </li>
            <li>
              <NavLink to={'/register'} className={({ isActive }) => (isActive ? styles.active : '')} onClick={closeMenu}>Cadastro</NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink to={'/posts/create'} className={({ isActive }) => (isActive ? styles.active : '')} onClick={closeMenu}>Novo post</NavLink>
            </li>
            <li>
              <NavLink to={'/dashboard'} className={({ isActive }) => (isActive ? styles.active : '')} onClick={closeMenu}>Dashboard</NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to={'/about'} className={({ isActive }) => (isActive ? styles.active : '')} onClick={closeMenu}>Sobre</NavLink>
        </li>
        {user && (
          <li>
            <button onClick={() => { logout(); closeMenu(); window.location.reload(true) }}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default NavBar;
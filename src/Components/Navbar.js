import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Buttonlogin';
import { useAuth0 } from '@auth0/auth0-react';
import './navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  useEffect(() => {
    /* Actualizar el estado "click" cuando el valor de "isAuthenticated" cambie */
    setClick(false); // Cerrar el menú cuando se produce el cambio de autenticación
  }, [isAuthenticated]);

  window.addEventListener('resize', showButton);
  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo'>
            <span>VIDEO GAMES NEWS</span>
            <i className='fa-solid fa-pen-fancy'></i>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            {/* Icono de tres rayas */}
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
  
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {isAuthenticated ? (
              <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle nav-links'
                href='#'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
                onClick={() => setDropdown(!dropdown)}
                onMouseEnter={() => setDropdown(true)}
              >
                Blogs
              </a>
              {dropdown && (
                <ul className='dropdown-menu' onMouseLeave={() => setDropdown(false)}>
                  <li>
                    <Link to='/create' onClick={closeMobileMenu}>
                      Crear Blog
                    </Link>
                  </li>
                  <li>
                    <Link to='/blogs' onClick={closeMobileMenu}>
                      Lista De Blogs
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            ) : (
              <li className='nav-item'>
                <Link to='/blogs' className='nav-links' onClick={closeMobileMenu}>
                  Lista De Blogs
                </Link>
              </li>
            )}
          </ul>
        </div>

  
        {isAuthenticated ? (
  <div className='navbar-container'>
    <div className='user-info'>
      {/* envuelve la imagen del usuario en un botón con la clase .user-avatar-button y
       agrega un contenedor con la clase .dropdown-content que contiene los enlaces al
        perfil y la configuración */}
      <button className='user-avatar-button'>
        <img
          className='user-avatar'
          src={user.picture}
          alt={user.name}
        />
        <ul className='dropdown-content'>
          {/* Actualiza el valor del atributo href del enlace al perfil de usuario a /perfil */}
          <a href='/perfiluser'>Perfil</a>
          <a href='/settings'>Configuración</a>
        </ul>
      </button>
      <span className='user-name'>{user.name}</span>
    </div>
    <div className='navbar-container'>
      <Button buttonStyle='btn--outline' onClick={() => logout()}>
        Cerrar Sesión
      </Button>
    </div>
  </div>
) : (
              <div className='navbar-container'>
                  {button && (
                      <Button
                          buttonStyle='btn--outline'
                          onClick={() => loginWithRedirect()}
                      >
                          Iniciar sesión
                      </Button>
                  )}
              </div>
          )}

      </nav>
    </>
  );
  }  

export default Navbar;




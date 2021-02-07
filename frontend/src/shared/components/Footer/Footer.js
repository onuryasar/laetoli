import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';

import './Footer.css';

const Footer = () => {
  const { isLoggedIn, name, logout } = useContext(AuthContext);

  return (
    <div>
      <ul className="footer-links">
        {!isLoggedIn && (
          <li>
            <NavLink to="/auth" exact>
              Login
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            {name} |{' '}
            <NavLink to="/me" exact>
              My Footprints
            </NavLink>{' '}
            |<span onClick={logout}>Logout</span>
          </li>
        )}
        <li>
          <NavLink to="/about" exact>
            About laeto-li
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Footer;

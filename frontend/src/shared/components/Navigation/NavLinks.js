import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All Footprints
        </NavLink>
      </li>
      <li>
        <NavLink to="/me" exact>
          My Footprints
        </NavLink>
      </li>
      <li>
        <NavLink to="/search" exact>
          <span role="img" aria-label="Magnifier emoji">
            🔍
          </span>{' '}
          Search
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;

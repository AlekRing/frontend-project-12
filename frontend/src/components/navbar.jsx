import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <span className="navbar-brand">Chat</span>
        <ul className="navbar-nav d-flex flex-row">
          <li className="nav-item">
            <Link className="nav-link" to="/">Chat</Link>
          </li>
          <li className="nav-item ms-3">
            <button
              className="nav-link"
              onClick={handleClick}
              type="button"
              style={{ border: 'none', background: 'transparent' }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

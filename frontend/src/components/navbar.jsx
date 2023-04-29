import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { userNameSelector } from '../store/selectors/selectors';

const UnAuthorizedHeader = ({ isLoginPage, t }) => (isLoginPage ? (
  <li className="nav-item">
    <Link className="nav-link" to="/signup">
      {t('signup')}
    </Link>
  </li>
) : (
  <li className="nav-item">
    <Link className="nav-link" to="/login">
      {t('login')}
    </Link>
  </li>
));

const AuthorizedHeader = ({ handleClick, t }) => (
  <>
    <li className="nav-item">
      <Link className="nav-link" to="/">
        {t('chat')}
      </Link>
    </li>
    <li className="nav-item ms-3">
      <button
        className="nav-link"
        onClick={handleClick}
        type="button"
        style={{ border: 'none', background: 'transparent' }}
      >
        {t('logout')}
      </button>
    </li>
  </>
);

const Navbar = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { isLoggedIn, logOut } = useAuth();
  const userName = useSelector(userNameSelector);

  const isLoginPage = pathname.slice(1) === 'login';

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="nav-link" to={isLoggedIn ? '/' : '/login'}>
          <h1 className="fs-5">Hexlet Chat</h1>
        </Link>
        <ul className="navbar-nav d-flex flex-row">
          <li className="nav-item">
            <div className="nav-link fw-bold text-capitalize">
              {userName}
            </div>
          </li>
          {isLoggedIn ? (
            <AuthorizedHeader handleClick={logOut} t={t} />
          ) : (
            <UnAuthorizedHeader isLoginPage={isLoginPage} t={t} />
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

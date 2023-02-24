import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UnAuthorizedHeader = ({ isLogin, t }) => (isLogin ? (
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

const Navbar = ({ token }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isToken = token !== 'undefined' && !!token;
  const isLogin = pathname.slice(1) === 'login';

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="nav-link" to="/">
          <h1 className="fs-5">
            Hexlet Chat
          </h1>
        </Link>
        <ul className="navbar-nav d-flex flex-row">
          {isToken
            ? <AuthorizedHeader handleClick={logout} t={t} />
            : <UnAuthorizedHeader isLogin={isLogin} t={t} />}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

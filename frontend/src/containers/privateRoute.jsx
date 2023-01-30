import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children, token }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || token === 'undefined') navigate('/login');
  }, [navigate, token]);

  return (children);
};

export default PrivateRoute;

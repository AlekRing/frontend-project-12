import { useContext } from 'react';
import AuthContext from '../store/context/authContext';

// eslint-disable-next-line import/prefer-default-export
export const useAuth = () => useContext(AuthContext);

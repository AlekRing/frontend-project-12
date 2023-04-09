import { useContext } from 'react';
import AuthContext from '../store/context/authContext';

export const useAuth = () => useContext(AuthContext);

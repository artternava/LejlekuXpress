import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';

const useAuthToken = () => {
  const [cookies] = useCookies(['access_token']);
  const [token, setToken] = useState(cookies.access_token || '');
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState(null); // Initialize as null

  useEffect(() => {
    setToken(cookies.access_token || '');

    try {
      const decodedToken = jwt_decode(cookies.access_token);
      const id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      
      setUserId(id);
      setUserRole(role);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }, [cookies.access_token]);

  return { token, userId, userRole };
};

export default useAuthToken;

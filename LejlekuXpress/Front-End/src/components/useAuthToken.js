import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const useAuthToken = () => {
  const [cookies] = useCookies(['access_token']);
  const [token, setToken] = useState(cookies.access_token || '');


  
  useEffect(() => {
    setToken(cookies.access_token || '');
  }, [cookies.access_token]);
  

  return token;
};

export default useAuthToken;

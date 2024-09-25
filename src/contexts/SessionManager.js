import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfigContext } from './ConfigContext';

const SessionTimeoutHandler = () => {
  const navigate = useNavigate();
  const { state } = useContext(ConfigContext);

  useEffect(() => {
    let timer;
    const logout = () => {
      console.log('Logging out due to inactivity');
      sessionStorage.removeItem('authToken');
      navigate('/auth/signin');
    };
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(logout, 50 * 60 * 1000)
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);

    resetTimer();
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [navigate]);

  return null;
};

export default SessionTimeoutHandler;

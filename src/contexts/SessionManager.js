import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfigContext } from './ConfigContext';

const SessionTimeoutHandler = () => {
  const navigate = useNavigate();
  const { state } = useContext(ConfigContext);

  useEffect(() => {
    let timer;

    // Function to log out the user and navigate to login page
    const logout = () => {
      console.log('Logging out due to inactivity');
      // Remove auth token from sessionStorage
      sessionStorage.removeItem('authToken');
      // Navigate to the login page
      navigate('/auth/signin');
    };

    // Function to reset the logout timer
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(logout, 50 * 60 * 1000); // 5 minutes
    };

    // Attach event listeners for user activity
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);

    // Initialize the timer when the component mounts
    resetTimer();

    // Cleanup on unmount: clear the timer and remove event listeners
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [navigate]);

  return null; // This component doesn't render anything visible
};

export default SessionTimeoutHandler;

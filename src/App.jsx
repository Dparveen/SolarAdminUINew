import { BrowserRouter } from 'react-router-dom';

// project-import
import SessionTimeoutHandler from 'contexts/SessionManager';
import renderRoutes, { routes } from './routes';

// ==============================|| APP ||============================== //

const App = () => {
  return <BrowserRouter basename={import.meta.env.VITE_APP_BASE_NAME}>
  <SessionTimeoutHandler />
  {renderRoutes(routes)}
  </BrowserRouter>;
};

export default App;

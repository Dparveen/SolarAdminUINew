import { createRoot } from 'react-dom/client';

// styles
import './index.scss';

// projct import
import App from './App';
import { ConfigProvider } from './contexts/ConfigContext';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ConfigProvider>
    <App />
  </ConfigProvider>
);

reportWebVitals();

import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'widgets/ErrorBoundary/ErrorBoundary.tsx';
import App from 'app/App';
import 'shared/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
);

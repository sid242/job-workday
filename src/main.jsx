import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);

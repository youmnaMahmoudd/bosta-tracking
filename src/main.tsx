import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './assets/localizer.ts';

// Redux imports
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store'; // Import your Redux store and persistor

const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading...</h3>
  </div>
);

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={loadingMarkup}>
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={loadingMarkup} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </StrictMode>
  </Suspense>

);

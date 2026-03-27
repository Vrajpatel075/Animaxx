import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { Store } from './assets/Redux/Store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <App />
  </Provider>
)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js',{ updateViaCache: 'none' });
}

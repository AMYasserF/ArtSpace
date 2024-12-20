import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "../node_modules/bootstrap/js/src/collapse";
import "../node_modules/bootstrap/js/src/dropdown";
import "../node_modules/bootstrap/dist/js/bootstrap";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

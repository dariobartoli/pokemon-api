import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ShowModalProvider } from './context/ShowModalContext.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShowModalProvider>
      <App />
    </ShowModalProvider>
  </React.StrictMode>,
)

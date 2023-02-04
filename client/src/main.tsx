import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { UserDataProvider } from './state/context/UserDetailsProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserDataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserDataProvider>
  </React.StrictMode>
)

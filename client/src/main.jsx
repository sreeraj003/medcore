import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import './main.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Context from './context/authContext.jsx'
// import { PersistGate } from "redux-persist/integration/react";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context>
      <Provider store={store}>      
        <App />
      </Provider>
    </Context>
  </React.StrictMode>
)

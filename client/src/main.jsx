import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import './main.css'
import { Provider } from 'react-redux'
import Footer from "./components/Footer.jsx"
import { SocketProvider } from './context/socket/socketProvider.jsx'
import store from './redux/store.js'
import Context from './context/authContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketProvider>
      <Context>
        <Provider store={store}>
          <App />
          <Footer />
        </Provider>
      </Context>
    </SocketProvider>
  </React.StrictMode>
)

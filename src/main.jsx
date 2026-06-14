// import { createRoot } from 'react-dom/client'
// import { Provider } from 'react-redux'
// import { store } from './store/store.js'
// import App from './App.jsx'
// import './assets/styles/main.css'

// const container = document.getElementById('root')
// const root = createRoot(container)
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// )

import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { RootCmp } from './RootCmp.jsx'
import './assets/styles/main.css'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <Router>
        <RootCmp />
    </Router>
  </Provider>
)
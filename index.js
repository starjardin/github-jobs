import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import { JobsContextProvider } from './context/JobsContext'

ReactDOM.render(
  <JobsContextProvider>
    <Router>
      <App />
    </Router>
  </JobsContextProvider>
  , document.getElementById("root")
)

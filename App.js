import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './components/HomePage'
import JobDetails from './components/JobDetails'

import { GlobalContext } from './context/JobsContext'

export default function App() {
  const { test } = useContext(GlobalContext)
  
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/job/:jobId">
          <JobDetails />
        </Route>
      </Switch>
    </>
  )
}

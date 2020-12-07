import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './components/HomePage'

import { GlobalContext } from './context/JobsContext'

export default function App() {
  const { test } = useContext(GlobalContext)
  
  return (
    <>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </>
  )
}

import React, { useContext } from 'react'

import { GlobalContext } from '../context/JobsContext'
import Header from './Header';
import Main from './Main';

export default function HomePage() {
  const { state, dispatch } = useContext(GlobalContext)

  return (
    <>
      <div>
        <Header />
        <Main />
      </div>
    </>
  )
}

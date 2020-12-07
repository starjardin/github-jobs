import React, { useContext } from 'react'

import { GlobalContext } from '../context/JobsContext'
import Header from './Header';
import Search from './Search';

export default function HomePage() {
  const { state, dispatch } = useContext(GlobalContext)

  return (
    <>
      <div>
        <Header />
        <Search />
      </div>
    </>
  )
}

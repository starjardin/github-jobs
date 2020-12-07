import React, { useContext } from 'react'

import { GlobalContext } from '../context/JobsContext'
import Search from './Search';

export default function HomePage() {
  const { state, dispatch } = useContext(GlobalContext)

  return (
    <>
      <div>
        <Search />
      </div>
    </>
  )
}

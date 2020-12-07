import React, { useContext, useState } from 'react'

import { GlobalContext, ACTIONS } from '../context/JobsContext'

export default function SearchJobsByKeyWords() {
  const { state, dispatch } = useContext(GlobalContext)
  const [jobsByKeyWords, setJobsByKeyWords] = useState('')

  function handleSearchSubmit(e) {
    e.preventDefault()
    dispatch({ type: ACTIONS.SEARCH_JOB_BY_KEY_WORDS, foundJobsByKeyWords : jobsByKeyWords })
  }
  
  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        name="searchJob"
        value={jobsByKeyWords}
        onChange={(e) => setJobsByKeyWords(e.target.value)}
      />
      <button>Search</button>
    </form>
  )
}

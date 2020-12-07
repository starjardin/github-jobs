import React, { useContext, useState } from 'react'

import { GlobalContext, ACTIONS } from '../context/JobsContext'

export default function SearchJobsByLocation() {
  const [jobsByLocation, setJobsByLocation] = useState('')
  const { state, dispatch } = useContext(GlobalContext)

  function handleSearchJobsByLocation(e) {
    e.preventDefault()
    dispatch({type : ACTIONS.SEARCH_JOB_BY_LOCATION, foundJobsByLocation : jobsByLocation})
  }

  return (
    <form onSubmit={handleSearchJobsByLocation}>
      <input
        name="searchJob"
        value={jobsByLocation}
        onChange={(e) => setJobsByLocation(e.target.value)}
      />
      <button>Search</button>
    </form>
  )
}

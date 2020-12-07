import React, { useContext, useState } from 'react'

import { GlobalContext, ACTIONS } from '../context/JobsContext'

export default function SearchJobsByLocation() {
  const [jobsByLocation, setJobsByLocation] = useState('')
  const [jobsByGivenLocation, setJobsByGivenLocation] = useState('')
  const { state, dispatch } = useContext(GlobalContext)

  function handleSearchJobsByLocation(e) {
    e.preventDefault()
    dispatch({type : ACTIONS.SEARCH_JOB_BY_LOCATION, foundJobsByLocation : jobsByLocation})
  }

  function handleSearchJobsByGivenLoaction(e) {
    setJobsByGivenLocation(e.target.value)
    dispatch({ type: ACTIONS.SEARCH_JOB_BY_GIVEN_LOCATION, foundJobsByGivenLocation: jobsByGivenLocation })
    console.log(e.target.value);
  }

  return (
    <form onSubmit={handleSearchJobsByLocation}>
      <input
        name="searchJob"
        value={jobsByLocation}
        onChange={(e) => setJobsByLocation(e.target.value)}
      />
      <button>Search</button>
      <label htmlFor="london">London</label>
      <input
        id="london"
        type="checkbox"
        name="searchJobByCity"
        value="london"
        onChange={handleSearchJobsByGivenLoaction}
      />
      <label htmlFor="london">New York</label>
      <input
        id="london"
        type="checkbox"
        name="searchJobByCity"
        value="new york"
        onChange={handleSearchJobsByGivenLoaction}
      />
      <label htmlFor="london">Berlin</label>
      <input
        id="london"
        type="checkbox"
        name="searchJobByCity"
        value="berlin"
        onChange={handleSearchJobsByGivenLoaction}
      />
      <label htmlFor="london">San Francisco</label>
      <input
        id="london"
        type="checkbox"
        name="searchJobByCity"
        value="san francisco"
        onChange={handleSearchJobsByGivenLoaction}
      />
    </form>
  )
}

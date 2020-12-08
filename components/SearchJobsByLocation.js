import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import { GlobalContext, ACTIONS } from '../context/JobsContext'
import FullTimeJobSearch from './FullTimeJobSearch'

const FormStyles = styled.form`
  .inputs {
    display : flex;
    flex-direction : row-reverse;
    justify-content : flex-end;
    align-items : center;
  }
  [type="text"] {
    padding : .6rem;
    margin-bottom : 2rem;
  }
  .btn-search {
    visibility : hidden;
  }
  .location-search {
    display : block;
    margin-top : 2rem;
  }
`

export default function SearchJobsByLocation() {
  const { state, dispatch } = useContext(GlobalContext)
  const [jobsByLocation, setJobsByLocation] = useState('')
  const [jobsByGivenLocation, setJobsByGivenLocation] = useState(state.location)
  const cities = ["london", "San Fransisco", "Berlin", "new york"]
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
    <>
      <FormStyles onSubmit={handleSearchJobsByLocation}>
        <FullTimeJobSearch />
        <label htmlFor="location" className="location-search">Location</label>
        <input 
          type="text"
          id="location"
          name="searchJob"
          value={jobsByLocation}
          onChange={(e) => setJobsByLocation(e.target.value)}
        />
        <button className="btn-search">Search</button>
        {cities.map((city, index) => (
          <div className="inputs" key={index}>
            <label htmlFor={city}>{ city }</label>
            <input
              id={city}
              type="checkbox"
              name="searchJobByCity"
              value={city}
              checked={city.toLocaleLowerCase().trim() === jobsByGivenLocation.toLocaleLowerCase().trim()}
              onChange={handleSearchJobsByGivenLoaction}
            />
          </div>
        ))}
        </FormStyles>
      </>
  )
}

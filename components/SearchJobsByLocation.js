import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import { GlobalContext, ACTIONS } from '../context/JobsContext'

const FormStyles = styled.form`
  .inputs {
    display : flex;
    flex-direction : row-reverse;
    justify-content : flex-end;
    align-items : center;
  }
`

export default function SearchJobsByLocation() {
  const [jobsByLocation, setJobsByLocation] = useState('')
  const [jobsByGivenLocation, setJobsByGivenLocation] = useState('')
  const { state, dispatch } = useContext(GlobalContext)
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
        <input
          name="searchJob"
          value={jobsByLocation}
          onChange={(e) => setJobsByLocation(e.target.value)}
        />
        <button>Search</button>
        {cities.map((city, index) => (
          <div className="inputs" key={index}>
            <label htmlFor={city}>{ city }</label>
            <input
              id={city}
              type="checkbox"
              name="searchJobByCity"
              value={city}
              onChange={handleSearchJobsByGivenLoaction}
            />
          </div>
        ))}
        </FormStyles>
      </>
  )
}

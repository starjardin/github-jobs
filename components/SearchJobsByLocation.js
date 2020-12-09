import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { IoMdGlobe } from 'react-icons/io'

import { GlobalContext, ACTIONS } from '../context/JobsContext'
import FullTimeJobSearch from './FullTimeJobSearch'

const FormStyles = styled.form`
  .inputs {
    display : flex;
    flex-direction : row-reverse;
    justify-content : flex-end;
    align-items : center;
    gap : .3rem;
    label {
      text-transform : capitalize
    }
  }
  [type="text"] {
    padding : .6rem;
    border : none;
  }

  [type="text"]:focus {
    outline : none;
    boder : 1px solid #334680;
    box-shadow : 1px 1px 3px #334680;
  }
  .btn-search {
    visibility : hidden;
  }
  .location-search {
    display : block;
    margin-top : 2rem;
    font-size: 14px;
    line-height: 21px;
    text-transform: uppercase;
    color: #B9BDCF;
  }
  .input-container {
    display : flex;
    align-items : center;
    gap : 6px;
    margin-bottom : 2rem;
    background-color : #fff;
    padding : .5rem .5rem .5rem 1rem;
    border-radius : 7px;
  }
`

export default function SearchJobsByLocation() {
  const { state, dispatch } = useContext(GlobalContext)
  const [jobsByLocation, setJobsByLocation] = useState('')
  const [jobsByGivenLocation, setJobsByGivenLocation] = useState(state.location)
  const cities = ["london", "San Fransisco", "Berlin", "new york"]

  function handleSearchJobsByLocation(e) {
    e.preventDefault()
    dispatch({
      type: ACTIONS.SEARCH_JOB_BY_LOCATION,
      foundJobsByLocation: jobsByLocation,
    })
    setJobsByLocation('')
  }

  function handleSearchJobsByGivenLoaction(e) {
    setJobsByGivenLocation(e.target.value)
    dispatch({ type: ACTIONS.SEARCH_JOB_BY_GIVEN_LOCATION, foundJobsByGivenLocation: e.target.value })
  }

  return (
    <>
      <FormStyles onSubmit={handleSearchJobsByLocation}>
        <FullTimeJobSearch />
        <label htmlFor="location" className="location-search">Location</label>
        <div className="input-container">
          <IoMdGlobe />
          <input 
            type="text"
            autoComplete="off"
            id="location"
            name="searchJob"
            placeholder="city, state, zip code or country"
            value={jobsByLocation}
            onChange={(e) => setJobsByLocation(e.target.value)}
          />
        </div>
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

import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import { ACTIONS, GlobalContext } from '../context/JobsContext'

//style of the full time job search
const FullTimeJobSearchStyles = styled.div` 
  display : flex;
  flex-direction : row-reverse;
  align-items : center;
  justify-content : flex-end;
`

export default function FullTimeJobSearch() {
  const { state, dispatch } = useContext(GlobalContext)
  const [ fullTimeJobIsChecked, setFullTimeJobIsChecked ] = useState(state.full_time)

  //this following function is responsible for watching if the checbox of full time job is checked and do the fetch.
  function handleSearchFullTimeJob(e) {
    setFullTimeJobIsChecked(!fullTimeJobIsChecked)
    dispatch({type : ACTIONS.SEARCH_BY_FULL_TIME_JOB, fullTimeJobIsChecked })
  }

  return (
    <FullTimeJobSearchStyles>
      <label htmlFor="full_time">Full time</label>
      <input type="checkbox" onChange={handleSearchFullTimeJob} checked={ fullTimeJobIsChecked} id="full_time"/>
    </FullTimeJobSearchStyles>
  )
}

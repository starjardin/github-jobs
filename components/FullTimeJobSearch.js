import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import { ACTIONS, GlobalContext } from '../context/JobsContext'

const FullTimeJobSearchStyles = styled.div` 
  display : flex;
  flex-direction : row-reverse;
  align-items : center;
  justify-content : flex-end;
`

export default function FullTimeJobSearch() {
  const { state, dispatch } = useContext(GlobalContext)
  const [ fullTimeJobIsChecked, setFullTimeJobIsChecked ] = useState(state.full_time)

  function handleSearchFullTimeJob(e) {
    setFullTimeJobIsChecked(!fullTimeJobIsChecked)
    dispatch({type : ACTIONS.SEARCH_BY_FULL_TIME_JOB, fullTimeJobIsChecked })
  }

  return (
    <FullTimeJobSearchStyles>
      <label>Full time</label>
      <input type="checkbox" onChange={handleSearchFullTimeJob} checked={ fullTimeJobIsChecked}/>
    </FullTimeJobSearchStyles>
  )
}

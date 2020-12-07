import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import { GlobalContext, ACTIONS } from '../context/JobsContext'

const FormSearchByKeyWords = styled.form`
  display : flex;
  justify-content : space-between;
  align-items : center;
  background-color : #fff;
  width : 100%;
`

export default function SearchJobsByKeyWords() {
  const { state, dispatch } = useContext(GlobalContext)
  const [jobsByKeyWords, setJobsByKeyWords] = useState('')

  function handleSearchSubmit(e) {
    e.preventDefault()
    dispatch({ type: ACTIONS.SEARCH_JOB_BY_KEY_WORDS, foundJobsByKeyWords: jobsByKeyWords })
    setJobsByKeyWords('')
  }
  
  return (
    <FormSearchByKeyWords onSubmit={handleSearchSubmit}>
      <input
        name="searchJob"
        value={jobsByKeyWords}
        onChange={(e) => setJobsByKeyWords(e.target.value)}
      />
      <button>Search</button>
    </FormSearchByKeyWords>
  )
}

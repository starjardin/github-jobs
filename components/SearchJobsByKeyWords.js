import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { BsBag } from 'react-icons/bs'
import { GlobalContext, ACTIONS } from '../context/JobsContext'

const FormSearchByKeyWords = styled.form`
  display : flex;
  justify-content : space-between;
  align-items : center;
  background-color : #fff;
  width : 85vw;
  margin : auto;
  padding-block : 1rem;
  margin-bottom : 2rem;
  input {
    width : 100%;
    border : none;
    padding : 1rem;
  }

  button {
    margin : 0 2rem;
    padding : 0.7rem 1.2rem;
    background-color : #1E86FF;
    border : none;
    border-radius : 5px;
  }
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
        placeholder="title, companies, expertise"
        value={jobsByKeyWords}
        onChange={(e) => setJobsByKeyWords(e.target.value)}
      />
      <button>Search</button>
    </FormSearchByKeyWords>
  )
}

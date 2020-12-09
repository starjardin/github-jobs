import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { BsBag } from 'react-icons/bs'
import { GlobalContext, ACTIONS } from '../context/JobsContext'

//styles of the form
const FormSearchByKeyWords = styled.form`
  display : flex;
  justify-content : space-between;
  align-items : center;
  background-color : #fff;
  width : 100%;
  margin : auto;
  padding-block : 1rem;
  border-radius : 5px;
  flex-wrap : wrap;
  div {
    flex-wrap : wrap;
    display : flex;
    justify-content : space-between;
    align-items : center;
    padding : 0rem 1rem;
  }
  input {
    border : none;
    padding : 1rem;
    margin-left : 1rem;
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
  //this function will handle the key words that you are typing and will do the fetch in the dispatch
  function handleSearchSubmit(e) {
    e.preventDefault()
    dispatch({ type: ACTIONS.SEARCH_JOB_BY_KEY_WORDS, foundJobsByKeyWords: jobsByKeyWords })
    //clear the input after you submit
    setJobsByKeyWords('')
  }
  
  return (
    <FormSearchByKeyWords onSubmit={handleSearchSubmit}>
      <div>
        <BsBag />
        <input
          name="searchJob"
          placeholder="title, companies, expertise"
          value={jobsByKeyWords}
          onChange={(e) => setJobsByKeyWords(e.target.value)}
        />
      </div>
      <button>Search</button>
    </FormSearchByKeyWords>
  )
}

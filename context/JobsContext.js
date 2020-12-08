import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'

const GlobalContext = createContext()
const initialState = {
  description: "python",
  location: "new york",
  lat: "",
  long: "",
  full_time: true,
  jobs: [],
  loading: true,
  error: "",
  id : ""
}

export const ACTIONS = {
  LOADING_STATE: "loading state",
  SEARCH_JOB_BY_KEY_WORDS : "search_job_by_key_words",
  SEARCH_JOB_BY_LOCATION : "search_job_by_loaction",
  SEARCH_JOB_BY_GIVEN_LOCATION : "search_job_by_given_loaction",
}

export const API_URL = "https://jobs.github.com/"
export const CORS_KEY = "https://cors-anywhere.herokuapp.com/"

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOADING_STATE : {
      return {
        ...state,
        jobs: action.payload,
        loading : false
      }
    }
    case ACTIONS.SEARCH_JOB_BY_KEY_WORDS : {
      return {
        ...state,
        description : action.foundJobsByKeyWords
      }
    }
    case ACTIONS.SEARCH_JOB_BY_LOCATION: {
      return {
        ...state,
        description : '',
        location: action.foundJobsByLocation
      }
    }
    case ACTIONS.SEARCH_JOB_BY_GIVEN_LOCATION: {
      console.log(action.foundJobsByGivenLocation);
      return {
        ...state,
        description : '',
        location: action.foundJobsByGivenLocation
      }
    }
    default: {
      return state
    }
  }
}


function JobsContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  function getJobsData() {
    axios
      .get(CORS_KEY + API_URL + `positions.json?description=${state.description}&location=${state.location}`)
      .then(response => {
        dispatch({ type: ACTIONS.LOADING_STATE, payload : response.data })
      })
      .catch(error => {
        dispatch({type : "FETCH_ERROR" })
      })
  }

  useEffect(() => {
    getJobsData()
  }, [])

  useEffect(() => {
    getJobsData()
  }, [state.description])

  useEffect(() => {
    getJobsData()
  }, [state.location])

  console.log(state);
  return (
    <GlobalContext.Provider value={{state, dispatch }}>
      { children }
    </GlobalContext.Provider>
  )
}

export { JobsContextProvider, GlobalContext }
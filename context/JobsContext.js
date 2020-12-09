import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'

const GlobalContext = createContext()
const initialState = {
  description: "python",
  location: "new york",
  lat: "",
  long: "",
  search: "code",
  full_time: false,
  jobs: [],
  loading: true,
  error: "",
  id : ""
}

export const ACTIONS = {
  LOADING_STATE: "loading state",
  FETCH_ERROR : "fetch_error",
  SEARCH_JOB_BY_KEY_WORDS : "search_job_by_key_words",
  SEARCH_JOB_BY_LOCATION : "search_job_by_loaction",
  SEARCH_JOB_BY_GIVEN_LOCATION : "search_job_by_given_loaction",
  SEARCH_BY_FULL_TIME_JOB : "search_full_time_job",
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
    case ACTIONS.FETCH_ERROR : return {
      ...state, error : "Something went wrong🥱!! try again"
    }
    case ACTIONS.SEARCH_JOB_BY_KEY_WORDS : {
      return {
        ...state,
        search: action.foundJobsByKeyWords,
        loading: false,
        description: '',
      }
    }
    case ACTIONS.SEARCH_BY_FULL_TIME_JOB: {
      if (action.fullTimeJobIsChecked) {
        console.log("yes it is true");
        console.log(action.fullTimeJobIsChecked);
        return {
          ...state,
          loading: false,
          description: '',
          loaction: '',
          full_time: action.fullTimeJobIsChecked,
        }
      }
      // return state
    }
    case ACTIONS.SEARCH_JOB_BY_LOCATION: {
      return {
        ...state,
        description: '',
        location: action.foundJobsByLocation,
        loading: false
      }
    }
    case ACTIONS.SEARCH_JOB_BY_GIVEN_LOCATION: {
      return {
        ...state,
        description : '',
        location: action.foundJobsByGivenLocation,
        loading : false
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
        dispatch({ type: ACTIONS.LOADING_STATE, payload: response.data })
      })
      .catch(error => {
        dispatch({type : "FETCH_ERROR" })
      })
  }

  function getJobsDataByKeyWords() {
    axios
      .get(CORS_KEY + API_URL + `positions.json?search=${state.search}`)
      .then(response => {
        dispatch({ type: ACTIONS.LOADING_STATE, payload : response.data })
      })
      .catch(error => {
        dispatch({type : "FETCH_ERROR" })
      })
  }

  function getFulltimeJobs() {
    axios
      .get(CORS_KEY + API_URL + `positions.json?description=${state.description}full_time=${state.full_time}location=${state.location}`)
      .then(response => {
        dispatch({ type: ACTIONS.LOADING_STATE, payload: response.data })
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

  useEffect(() => {
    getFulltimeJobs()
  }, [state.full_time])

  useEffect(() => {
    getJobsDataByKeyWords()
  }, [state.search])

  return (
    <GlobalContext.Provider value={{state, dispatch }}>
      { children }
    </GlobalContext.Provider>
  )
}

export { JobsContextProvider, GlobalContext }
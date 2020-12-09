import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'

const GlobalContext = createContext()

//these are the initial states of the app
const initialState = {
  description: "python",
  location: "",
  lat: "",
  long: "",
  search: "code",
  full_time: false,
  jobs: [],
  loading: true,
  error: "",
  id : ""
}

//here are the actions that are going to happen in the app. Just to make clear so we do not hard coding them
export const ACTIONS = {
  LOADING_STATE: "loading state",
  FETCH_ERROR : "fetch_error",
  SEARCH_JOB_BY_KEY_WORDS : "search_job_by_key_words",
  SEARCH_JOB_BY_LOCATION : "search_job_by_loaction",
  SEARCH_JOB_BY_GIVEN_LOCATION : "search_job_by_given_loaction",
  SEARCH_BY_FULL_TIME_JOB : "search_full_time_job",
}

//basic urls
export const API_URL = "https://jobs.github.com/"
export const CORS_KEY = "https://cors-anywhere.herokuapp.com/"

//function reducer
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
        location : ''
      }
    }
    case ACTIONS.SEARCH_BY_FULL_TIME_JOB: {
      console.log(action.fullTimeJobIsChecked);
      if (action.fullTimeJobIsChecked) {
        return {
          ...state,
          loading: false,
          description: '',
          loaction: '',
          full_time: action.fullTimeJobIsChecked,
        }
      } else {
        return state
      }
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

  //this function is getting all the jobs
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

  //searching for jobs by key words, use this function
  function getJobsDataByKeyWords() {
    axios
      .get(CORS_KEY + API_URL + `positions.json?search=${state.search}`)
      .then(response => {
        dispatch({ type: ACTIONS.LOADING_STATE, payload : response.data })
      })
      .catch(error => {
        dispatch({type : "FETCH_ERROR" })
      })
    return state.loading = true
  }

  //searching for jobs that are full time. use this function
  function getFulltimeJobs() {
    axios
      .get(CORS_KEY + API_URL + `positions.json?description=${state.description}&full_time=${state.full_time}&location=${state.location}`)
      .then(response => {
        dispatch({ type: ACTIONS.LOADING_STATE, payload: response.data })
      })
      .catch(error => {
        dispatch({type : "FETCH_ERROR" })
      })
  }

  //fetch data when the app loads
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

  // here we return our value that are going to be shared in other components
  return (
    <GlobalContext.Provider value={{state, dispatch }}>
      { children }
    </GlobalContext.Provider>
  )
}

export { JobsContextProvider, GlobalContext }
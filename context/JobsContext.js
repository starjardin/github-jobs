import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'

const GlobalContext = createContext()
const initialState = {
  description: "",
  location: "new york",
  lat: "",
  long: "",
  full_time: true,
  jobs : []
}
const ACTIONS = {
  LOADING_STATE : "loading state"
}

const API_URL = "https://jobs.github.com/"
const RUN_TIME = "positions.json?description=python&full_time=true&location=sf"
const  CORS_KEY = "https://cors-anywhere.herokuapp.com/"

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOADING_STATE: {
      
    }
  }
}


function JobsContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  async function getJobsData() {
    const jobsData = fetch(CORS_KEY + API_URL)
    console.log(jobsData);
    console.log("Hello world");
  }

  useEffect(() => {
    getJobsData()
    // dispatch({type : "LOADING_STATE"})
  }, [])
  return (
    <GlobalContext.Provider value={{state, dispatch, test : "test"}}>
      { children }
    </GlobalContext.Provider>
  )
}

export { JobsContextProvider, GlobalContext }
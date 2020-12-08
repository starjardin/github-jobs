import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { CgArrowLongLeft } from 'react-icons/cg'

const API_URL = "https://jobs.github.com/"
const CORS_KEY = "https://cors-anywhere.herokuapp.com/"

export default function JobDetails() {
  const [singleJobDetaijs, setSingleJobDetails] = useState({})
  const [ isLoading, setIsLoading ] = useState(true)
  const { jobId } = useParams()

  function getJobsData() {
    axios
      .get(CORS_KEY + API_URL + `positions/${jobId}.json?markdown=true`)
      .then(response => {
        setSingleJobDetails(response.data)
      })
    setIsLoading(false)
  }

  console.log(singleJobDetaijs);

  useEffect(() => {
    getJobsData()
  }, [ jobId ])

  return (
    <JobDetailsContextProvider singleJobDetaijs={singleJobDetaijs}>
      {isLoading
        ? <h2>Loading...</h2>
        : <>
            <JobHeader />
            <GoBackToSearch />
            <HowToApply />
            <Description />
          </>
      }
    </JobDetailsContextProvider>
  )
}

const JobDetailsContext = createContext()

function JobDetailsContextProvider({ children, singleJobDetaijs }) {
  return (
    <JobDetailsContext.Provider
      value={{ singleJobDetaijs }}
    >
      {children}
    </JobDetailsContext.Provider>
  )
}

function JobHeader () {
  const { singleJobDetaijs } = useContext(JobDetailsContext)
  return (
    <>
      <h2>
        {singleJobDetaijs.title} <button>{singleJobDetaijs.type}</button>
      </h2>
      <div className="company_logo">
        <img src={singleJobDetaijs.company_logo} />
        <h4>{singleJobDetaijs.company}</h4>
        <h4>{singleJobDetaijs.location}</h4>
      </div>
    </>
  )
}

function HowToApply() {
  const { singleJobDetaijs } = useContext(JobDetailsContext)
  return (
    <>
      <h4>How to apply</h4>
      <p>{singleJobDetaijs?.how_to_apply}</p>
    </>
  )
}

function Description() {
  const { singleJobDetaijs } = useContext(JobDetailsContext)
  return (
    <div>
      <p>{singleJobDetaijs?.description}</p>
    </div>
  )
}

function GoBackToSearch() {
  return (
    <Link to="/">
      <div>
        <CgArrowLongLeft />
        <small>Go back to search</small>
      </div>
    </Link>
  )
}
import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { CgArrowLongLeft } from 'react-icons/cg'
import { IoMdGlobe } from 'react-icons/io'
import { BsClock } from 'react-icons/bs'

import JobDetailsStyles from './styles/JobDetailsStyles'
import { API_URL, CORS_KEY } from '../context/JobsContext'

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
        : <JobDetailsStyles>
            <div>
              <GoBackToSearch />
              <HowToApply />
            </div>
            <div>
              <JobHeader />
              <Description />
            </div>
          </JobDetailsStyles>
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
        <div>
          <h4>{singleJobDetaijs.company}</h4>
          <div className="icon">
            <IoMdGlobe />
            <small>{singleJobDetaijs.location}</small>
          </div>
        </div>
      </div>
    </>
  )
}

function HowToApply() {
  const { singleJobDetaijs } = useContext(JobDetailsContext)
  return (
    <>
      <h4 className="howToApply">How to apply</h4>
      <p>{singleJobDetaijs?.how_to_apply}</p>
    </>
  )
}

function Description() {
  const { singleJobDetaijs } = useContext(JobDetailsContext)
  return (
    <>
      {singleJobDetaijs?.description}
    </>
  )
}

function GoBackToSearch() {
  return (
    <Link to="/">
      <div className="backToHome">
        <CgArrowLongLeft />
        <small>Go back to search</small>
      </div>
    </Link>
  )
}
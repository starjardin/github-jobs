import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { CgArrowLongLeft } from 'react-icons/cg'
import { IoMdGlobe } from 'react-icons/io'
import { BsClock } from 'react-icons/bs'

import JobDetailsStyles from './styles/JobDetailsStyles'
import { API_URL, CORS_KEY } from '../context/JobsContext'
import styled from 'styled-components'

export default function JobDetails() {
  const [singleJobDetails, setSingleJobDetails] = useState({})
  const { jobId } = useParams()

  function getJobsData() {
    axios
      .get(CORS_KEY + API_URL + `positions/${jobId}.json`)
      .then(response => {
        setSingleJobDetails(response.data)
      })
  }

  // 

  useEffect(() => {
    getJobsData()
  }, [])

  return (
    <JobDetailsContextProvider singleJobDetails={singleJobDetails}>
      {!singleJobDetails.title
        ? <h2>Loading...</h2>
        : <JobDetailsStyles>
            <div className="left">
              <GoBackToSearch />
              <HowToApply />
            </div>
            <div className="right">
              <JobHeader />
              <Description />
            </div>
          </JobDetailsStyles>
      }
    </JobDetailsContextProvider>
  )
}

const JobDetailsContext = createContext()

function JobDetailsContextProvider({ children, singleJobDetails }) {
  return (
    <JobDetailsContext.Provider
      value={{ singleJobDetails }}
    >
      {children}
    </JobDetailsContext.Provider>
  )
}

function JobHeader () {
  const { singleJobDetails } = useContext(JobDetailsContext)
  const date = new Date(singleJobDetails.created_at)
  const time = date.getTime()
  const timeNow = Date.now()
  const timeDifference = timeNow - time
  let dateDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24)) + " " + `days ago`
  if (dateDifference < 1) {
    dateDifference = Math.round(timeDifference / (1000 * 60 * 60)) + " " + `hours ago`
  } else if (dateDifference > 1 || dateDifference < 31) {
    dateDifference = Math.round(timeDifference * (1000 * 60 * 60 * 24 * 30)) ` months ago`
  }

  return (
    <>
      <div>
        <h2>
          {singleJobDetails.title} <button>{singleJobDetails.type}</button>
        </h2>
        <div className="clock-container">
          <BsClock />
          <small>{ dateDifference }</small>
        </div>
      </div>
      <div className="company_logo">
        <img src={singleJobDetails.company_logo} />
        <div>
          <h4>{singleJobDetails.company}</h4>
          <div className="icon">
            <IoMdGlobe />
            <small>{singleJobDetails.location}</small>
          </div>
        </div>
      </div>
    </>
  )
}

function createMarkup(jsonHtml) {
  return {__html : jsonHtml }
}

function HowToApply() {
  const { singleJobDetails } = useContext(JobDetailsContext)
  return (
    <>
      <h4 className="howToApply">How to apply</h4>
      <p dangerouslySetInnerHTML={createMarkup(singleJobDetails.how_to_apply)} />
    </>
  )
}

const JobDEscriptionStyles = styled.div`
  p {
    margin-block : .5rem;
  }

  h2 {
    margin-block : 1.5rem;
  }
`

function Description() {
  const { singleJobDetails } = useContext(JobDetailsContext)
  const description = singleJobDetails?.description

  return (
    <>
      <JobDEscriptionStyles dangerouslySetInnerHTML={createMarkup(description)} />
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
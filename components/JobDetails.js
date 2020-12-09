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
  let dateDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24))
  let hoursDifference = Math.round(timeDifference / (1000 * 60 * 60))

  if (dateDifference < 1) {
    dateDifference  = hoursDifference === 1 ? hoursDifference+ ` hour ago` : hoursDifference + ` hours ago`
  } else {
    dateDifference  = dateDifference === 1 ? dateDifference + ` day ago` : dateDifference  + ` days ago`
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

//this function is to transform html string to normal html
function createMarkup(jsonHtml) {
  return {__html : jsonHtml }
}

//styles for the how to apply components
const HowToApplyStyles = styled.div`
  a {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break : break-all;
  }
`

function HowToApply() {
  const { singleJobDetails } = useContext(JobDetailsContext)
  return (
    <HowToApplyStyles>
      <h4 className="howToApply">How to apply</h4>
      <p dangerouslySetInnerHTML={createMarkup(singleJobDetails.how_to_apply)} />
    </HowToApplyStyles>
  )
}

const JobDEscriptionStyles = styled.div`
  max-width : 100vw;
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
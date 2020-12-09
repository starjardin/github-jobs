import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { IoMdGlobe } from 'react-icons/io'
import { BsClock } from 'react-icons/bs'

const JobListsStyles = styled.ul`
  padding : 0;
  a {
    text-decoration : none;
    color : #334680;
  }
  li {
    list-style : none;
    background-color : #fff;
    margin-block : 1rem;
    display : flex;
    padding : 1rem 1rem 4rem 1rem;
    position : relative;
  }
  .company_logo {
    flex-basis : 30%;
  }

  .company_logo {
    width : 90px;
    height : 90px;
    position: relative;
    overflow : hidden;
    img {
      background-color : #F2F2F2;
      height : 100%;
      width : 100%;
      position: absolute;
      transform : translateX(-20%);
      border-radius: 4px;
    }
  }
  .job-loaction {
    display : flex;
    justify-content : center;
    flex-direction : row;
    position : absolute;
    gap : 1rem;
    right : 5%;
    bottom : 10%;
    div {
      display : flex;
      flex-direction : row;
      justify-content : center;
      gap : .5rem;
    }
    span {
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
      color: #B7BCCE;
    }
  }
`

export default function JobLists({ job }) {
  const date = new Date(job.created_at)
  const time = date.getTime()
  const timeNow = Date.now()
  const timeDifference = timeNow - time
  let dateDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24))

  if (dateDifference < 1) {
    dateDifference  = Math.round(timeDifference / (1000 * 60 * 60)) + ` hours ago`
  } else {
    dateDifference  = dateDifference === 1 ? dateDifference + ` day ago` : dateDifference  + ` days ago`
  }

  return (
    <JobListsStyles>
      <Link to={`/job/${job.id}`}>
        <li>
          <div className="company_logo">
            <img src={job.company_logo} />
          </div>
          <div className="jobDescription">
            <h4>{job.company}</h4>
            <p>{job.title}</p>
            <button>{ job.type }</button>
          </div>
          <div className="job-loaction">
            <div><IoMdGlobe /> <span>{ job.location } </span></div>
            <div><BsClock /><span>{ dateDifference } </span></div>
          </div>
        </li>
      </Link>
    </JobListsStyles>
  )
}

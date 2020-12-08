import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
      height : 100%;
      width : 100%;
      position: absolute;
      transform : translateX(-20%)
    }
  }
`

export default function JobLists({ job }) {
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
            {job.full_time && <button>full time</button>}
          </div>
        </li>
      </Link>
    </JobListsStyles>
  )
}

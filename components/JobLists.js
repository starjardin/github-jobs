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
    padding : 1rem 1rem 4rem 1rem;
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
            <button>{ job.type }</button>
          </div>
        </li>
      </Link>
    </JobListsStyles>
  )
}

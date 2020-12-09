import React, { useContext } from 'react'
import styled from 'styled-components'

import { GlobalContext } from '../context/JobsContext'
import JobLists from './JobLists'
import SearchJobsByKeyWords from './SearchJobsByKeyWords'
import SearchJobsByLocation from './SearchJobsByLocation'

const MainStyles = styled.div`
  @media (min-width : 720px) {
    display : flex;
    gap : 2rem;
    .search {
      flex-basis : 30%;
    }
    .jobLists {
      flex-basis : 70%;
    }
  }
`

const HeaderStyles = styled.div`
  background-image : url("https://raw.githubusercontent.com/onja-org/github-jobs/main/backgroundImg.png");
  padding : 2rem 3rem;
  background-repeat : no-repeat;
  background-size : 100% 100%;\
  margin-bottom : 2rem;
`

export default function HomePage () {
  const { state } = useContext(GlobalContext)
  const { jobs, loading } = state
  
  return (
    <>
      <HeaderStyles>
        <SearchJobsByKeyWords />
      </HeaderStyles>
      <MainStyles>
        <SearchJobsByLocation className="search"/>
        <div className="jobLists">
          {loading
            ? <h2>Loading...</h2> 
            : !jobs.length ? <h2>No items found</h2>
              : jobs.map((job, index) => (
              <JobLists key={index} job={ job }/>
            ))
          }
        </div>
      </MainStyles>
    </>
  )
}

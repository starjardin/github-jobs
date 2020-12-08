import React, { useContext } from 'react'
import styled from 'styled-components'

import { GlobalContext } from '../context/JobsContext'
import FullTimeJobSearch from './FullTimeJobSearch'
import JobLists from './JobLists'
import SearchJobsByKeyWords from './SearchJobsByKeyWords'
import SearchJobsByLocation from './SearchJobsByLocation'

const MainStyles = styled.div`
  display : flex;
  gap : 2rem;
  .search {
    flex-basis : 30%;
  }
  .jobLists {
    flex-basis : 70%;
  }
`

export default function HomePage () {
  const { state } = useContext(GlobalContext)
  const { jobs, loading } = state
  return (
    <>
      <SearchJobsByKeyWords />
      <FullTimeJobSearch />
      <MainStyles>
        <SearchJobsByLocation className="search"/>
        <div className="jobLists">
          {loading
            ? <h2>Loading...</h2>
            :  jobs.map((job, index) => (
              <JobLists key={index} job={ job }/>
            ))
          }
        </div>
      </MainStyles>
    </>
  )
}

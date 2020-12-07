import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CgArrowLongLeft } from 'react-icons/cg'

import { GlobalContext } from '../context/JobsContext';

export default function JobDetails() {
  const { state } = useContext(GlobalContext)
  const { jobs, loading } = state
  const { jobId } = useParams()
  
  const jobInDetails = jobs.find(job => job.id === jobId)

  return (
    <div>
      {loading
        ? <p>Loading...</p>
        : ( <>
        <div>
            <Link to="/">
              <CgArrowLongLeft> Go back to search </CgArrowLongLeft>
            </Link>
            <h4>How to apply</h4>
            <p>{ jobInDetails?.how_to_apply }</p>
          </div>
          <div>
            <p>{ jobInDetails?.description }</p>
          </div>
        </>)
      }
    </div>
  )
}

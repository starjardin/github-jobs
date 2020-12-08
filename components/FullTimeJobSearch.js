import React, { useContext } from 'react'
import styled from 'styled-components'

import { GlobalContext } from '../context/JobsContext'

const FullTimeJobSearchStyles = styled.div` 
  input {
    display : block;
  }

`

export default function FullTimeJobSearch() {
  const { state, dispatch } = useContext(GlobalContext)
  return (
    <FullTimeJobSearchStyles>
      <label>Full time</label>
      <input type="checkbox"/>
    </FullTimeJobSearchStyles>
  )
}

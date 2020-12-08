import React from 'react'
import styled from 'styled-components'

const HeaderStyles = styled.h1`
  strong {
    font-weight: bold;
    font-size: 24px;
    line-height: 36px;
    color: #282538;
    color : red;
  }
`


export default function Header() {
  return (
    <h1>
      <strong>GitHub</strong> Jobs
    </h1>
  )
}

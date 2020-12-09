import React from 'react'
import styled from 'styled-components'

const HeaderStyles = styled.h1`
  .strong {
    font-weight: 900;
    font-size: 24px;
    line-height: 36px;
    color: #282538;
    text-shadow: #FC0 1px 0 10px;
  }
  padding-bottom : 3rem;
`


export default function Header() {
  return (
    <HeaderStyles className="header">
      <strong className="strong">GitHub</strong> Jobs
    </HeaderStyles>
  )
}

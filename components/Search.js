import React from 'react'
import SearchJobsByKeyWords from './SearchJobsByKeyWords'
import SearchJobsByLocation from './SearchJobsByLocation'

export default function Search() {
  return (
    <div>
      <SearchJobsByKeyWords />
      <SearchJobsByLocation />
    </div>
  )
}

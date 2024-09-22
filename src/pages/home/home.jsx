import React from 'react'
import './home.scss'
import Sidebar from '../../components/sidebar/sidebar'
import Feed from '../../components/feed/feed.jsx'

const home = ({sidebar}) => {
  return (
    <>
        <Sidebar sidebar={sidebar} />
        <div className={`container ${sidebar ? "" : "large-container"}`}>
            <Feed />
        </div>
    </>
  )
}

export default home
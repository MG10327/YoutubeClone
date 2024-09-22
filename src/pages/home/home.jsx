import React from 'react'
import './home.scss'
import Sidebar from '../../components/sidebar/sidebar'

const home = ({sidebar}) => {
  return (
    <>
        <Sidebar sidebar={sidebar} />
    </>
  )
}

export default home
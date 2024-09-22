import React from 'react'
import './video.scss'
import PlayVideo from '../../components/playvideo/playvideo'
import Recommended from '../../components/recommended/recommended'

const video = () => {
  return (
    <div className='play-container'>
        <PlayVideo />
        <Recommended />
    </div>
  )
}

export default video
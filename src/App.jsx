import React from 'react'
import Navbar from './components/navbar/navbar'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/home/home.jsx'
import Video from './pages/video/video.jsx'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/video/:categoryId/:videoId" element={<Video/>} />
      </Routes>
    </div>
  )
}

export default App
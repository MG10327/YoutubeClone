import React, {useState} from 'react'
import './home.scss'
import Sidebar from '../../components/sidebar/sidebar'
import Feed from '../../components/feed/feed.jsx'

const home = ({sidebar}) => {

    const [category, setCategory] = useState(0)

  return (
    <>
        <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
        <div className={`container ${sidebar ? "" : "large-container"}`}>
            <Feed category={category} />
        </div>
    </>
  )
}

export default home
import React, { useEffect } from 'react'
import Call from './Call'
import HomeBanner from './HomeBanner'
import HomeCourse from './HomeCourse'
import HomeImages from './HomeImages'
import HomeTemplate from './HomeTemplate'

const Home: React.FC = () => {
  useEffect(() => {
    document.title = "Home - Sanjay Sokal"
  }, [])
  return (
    <>
      <HomeBanner />
      <div className="bg-gray">
        <HomeCourse />
      </div>
      <div className="bg-white">
        <HomeImages />
      </div>
      <div className="bg-gray">
        <HomeTemplate />
      </div>
      <div className="bg-white">
        <Call />
      </div>
    </>
  )
}

export default Home
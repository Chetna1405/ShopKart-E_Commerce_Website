import React, { useEffect, useState } from 'react'
import Background from '../components/Background';
import Hero from '../components/Hero';

const Home = () => {
  let heroData = [
    {
      text1: "Explore our best collections",
      text2: "Get hotselling articles"
    },
    {
      text1: "Explore our best collections",
      text2: "Get hotselling articles"
    },
    {
      text1: "Explore our best collections",
      text2: "Get hotselling articles"
    },
    {
      text1: "Explore our best collections",
      text2: "Get hotselling articles"
    }
  ]

  let [heroCount, setHeroCount] = useState(0);
  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount(prev => (prev === 3 ? 0 : prev + 1))
    }, 2000)
    return () => clearInterval(interval)
  }, [])


  return (
    <div className='overflow-x-hidden relative top-[0px]'>
      <div className='w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh] bg-gradient-to-l from-[#141414] to-[#0c2025]'>
        <Background
          heroCount={heroCount}
        />

        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
      </div>
    </div>
  )
}

export default Home
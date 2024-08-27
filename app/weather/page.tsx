"use client"

import React from 'react'
import {WeatherDisplay} from '@/components/WeatherDisplay'

const page = () => {
  return (
    <>
        <div className='flex flex-col items-center justify-center h-screen"'>
            <WeatherDisplay />
        </div>
    </>
  )
}

export default page
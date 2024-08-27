"use client"

import React from 'react'
import { useSelector } from 'react-redux'
import {RootState} from '@/store/store'

export const WeatherDisplay = () => {

    const {weatherData, loading, error} = useSelector((state: RootState) => state.weather);

    if(error) return <h2>Error: {error}</h2>
    if(loading) return <h2>Loading...</h2>
  
  return (
   <>
    <div className='container mx-auto p-4'>
        {weatherData ? (
            <>
                <h1 className='text-3xl'>Weather in {weatherData?.locality}</h1>
                <p>Temperature: {weatherData?.temperature}</p>
                <p>Condition: {weatherData?.condition}</p>
            </>
        ): (
            <>
                <p>No weather Data available. Please search for a city.</p>
            </>
        )}
    </div>
   </>
  )
}

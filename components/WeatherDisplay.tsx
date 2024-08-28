"use client"

import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useSearchParams, useRouter } from 'next/navigation'

export const WeatherDisplay = () => {
    const { weatherData, loading, error } = useSelector((state: RootState) => state.weather);
    const searchParams = useSearchParams();
    const placeName = searchParams.get('place') || "Unknown Location";
    const router = useRouter();

    const handleBackClick = () => {
        router.push('/'); 
    }

    if (error) return <h2 className="text-red-500 text-center mt-4">Error: {error}</h2>
    if (loading) return <h2 className="text-blue-500 text-center mt-4">Loading...</h2>

    return (
        <div className='container mx-auto p-6 max-w-4xl flex flex-col items-center justify-center min-h-screen'>
            <div className="bg-slate-700 shadow-lg rounded-lg p-6 border border-gray-200 w-full max-w-3xl">
                <h1 className='text-2xl font-semibold mb-4 text-center'>Weather in {placeName}</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
                    <div className="p-4 bg-blue-500 rounded-lg shadow-md">
                        <h3 className='text-xl font-medium'>Temperature</h3>
                        <p className='text-lg'>{weatherData.locality_weather_data?.temperature} °C</p>
                    </div>
                    <div className="p-4 bg-green-500 rounded-lg shadow-md">
                        <h3 className='text-xl font-medium'>Humidity</h3>
                        <p className='text-lg'>{weatherData.locality_weather_data?.humidity} %</p>
                    </div>
                    <div className="p-4 bg-yellow-500 rounded-lg shadow-md">
                        <h3 className='text-xl font-medium'>Wind Speed</h3>
                        <p className='text-lg'>{weatherData.locality_weather_data?.wind_speed} m/s</p>
                    </div>
                    <div className="p-4 bg-purple-500 rounded-lg shadow-md">
                        <h3 className='text-xl font-medium'>Wind Direction</h3>
                        <p className='text-lg'>{weatherData.locality_weather_data?.wind_direction} °</p>
                    </div>
                    <div className="p-4 bg-orange-500 rounded-lg shadow-md">
                        <h3 className='text-xl font-medium'>Rain Intensity</h3>
                        <p className='text-lg'>{weatherData.locality_weather_data?.rain_intensity} mm/h</p>
                    </div>
                    <div className="p-4 bg-teal-500 rounded-lg shadow-md">
                        <h3 className='text-xl font-medium'>Rain Accumulation</h3>
                        <p className='text-lg'>{weatherData.locality_weather_data?.rain_accumulation} mm</p>
                    </div>
                </div>
                <div className="text-center">
                    <button 
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition" 
                        onClick={handleBackClick}
                    >
                        Back to Search
                    </button>
                </div>
            </div>
        </div>
    )
}

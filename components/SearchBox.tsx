"use client"

import React, { ChangeEvent, FormEvent } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useRouter } from 'next/navigation'
import {fetchWeatherData, setSearchQuery, setSuggestions} from '@/store/weatherSlice'
import {RootState, AppDispatch} from '@/store/store'


const ALL_SUGGESTIONS: string[] = [
    "Sarita Vihar","Faridabad Sector 41-50", "New Friends Colony"
    // Add more suggestions or fetch from an API if needed
];


export const SearchBox = () => {

    const dispatch: AppDispatch  = useDispatch();
    const router = useRouter();
    const {searchQuery, suggestions} = useSelector((state: RootState) => state.weather);



    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;

        dispatch(setSearchQuery(query));

        // Dummy filtered suggestions logic (adjust as necessary)
        const filteredSuggestions: string[] = query
        ? ALL_SUGGESTIONS.filter((locality) =>
            locality.toLowerCase().includes(query.toLowerCase())
        )
        : [];

        dispatch(setSuggestions(filteredSuggestions));
    };

    const handleSearchClick = (e: FormEvent) => {
        e.preventDefault();
        dispatch(fetchWeatherData(searchQuery));
        router.push('/weather');
    }

    const handleSuggestionClick = (locality: string) => {
        dispatch(fetchWeatherData(locality));
        router.push('/weather');
    }

  return (
    <>
<div className='flex flex-col items-center w-full max-w-lg mt-10'>
            <form onSubmit={handleSearchClick} className='w-full'>
                <div className='relative'>
                    <input
                        type="text"
                        className='w-full p-4 border border-gray-300 rounded-full shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg'
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder='Enter a city name'
                        style={{ width: '100%', maxWidth: '600px' }} // Adjust width here
                    />
                    <button
                        type='submit'
                        className='absolute right-1 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        disabled={!searchQuery}
                        style={{ top: '50%', right: '2px' }} // Adjust button position here
                    >
                        Get Weather
                    </button>
                </div>
            </form>
            {suggestions.length > 0 && (
                <ul className='w-full border border-gray-300 rounded-b-lg mt-2 shadow-md bg-white'>
                    {suggestions.map((locality: string) => (
                        <li
                            key={locality}
                            className='p-2 cursor-pointer text-gray-600 hover:bg-gray-100 border-b border-gray-200'
                            onClick={() => handleSuggestionClick(locality)}
                        >
                            {locality}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </>
  )
}


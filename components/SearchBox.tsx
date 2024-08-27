"use client"

import React, { ChangeEvent } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useRouter } from 'next/navigation'
import {fetchWeatherData, setSearchQuery, setSuggestions} from '@/store/weatherSlice'
import {RootState, AppDispatch} from '@/store/store'

export const SearchBox = () => {

    const dispatch: AppDispatch  = useDispatch();
    const router = useRouter();
    const {searchQuery, suggestions} = useSelector((state: RootState) => state.weather);



    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;

        dispatch(setSearchQuery(query));

        // Dummy filtered suggestions logic (adjust as necessary)
        const filteredSuggestions: string[] = query
            ? ['New York', 'Los Angeles', 'Chicago'].filter((locality) =>
                  locality.toLowerCase().includes(query.toLowerCase())
              )
            : [];

        dispatch(setSuggestions(filteredSuggestions));
    };

    const handleSearchClick = () => {
        dispatch(fetchWeatherData(searchQuery));
        router.push('/weather');
    }

    const handleSuggestionClick = (locality: string) => {
        dispatch(fetchWeatherData(locality));
        router.push('/weather');
    }

  return (
    <>
        <div className='w-full max-w-md mt-6'>
            <input 
                type="text" 
                className='w-full p-4 border text-black rounded-lg'
                value={searchQuery}
                onChange={handleSearchChange} 
                placeholder='Search for a city'   
            />
            <button
                className="mt-2 p-2 bg-blue-500 text-white rounded-lg w-full"
                onClick={handleSearchClick}
            >
                    Get Weather
                </button>
            {suggestions.length > 0 && (
                <ul className='border rounded-lg mt-2'>
                    {suggestions.map((locality: string) => (
                        <li
                        key={locality}
                        className='p-2 cursor-pointer hover:bg-gray-500'
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


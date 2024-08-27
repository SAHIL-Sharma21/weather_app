import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'


export interface Weather {
    searchQuery: string;
    suggestions: string[];
    weatherData: any;
    error: string | null;
    loading: boolean;
}

const initialState:Weather = {
    loading: false,
    error: null,
    searchQuery: "",
    weatherData: null,
    suggestions: [], 
}


//fetch weather data
export const fetchWeatherData = createAsyncThunk(
    'weather/fetchWeatherData',
    async (locality: string) => {
        try {            
            const queryString = new URLSearchParams({locality_id: locality}).toString();

            const response = await fetch(`/get_locality_weather_data?${queryString}`, {
                headers: {
                    'X-Zomato-Api-Key': process.env.WEATHER_UNION_API_KEY!
                }
            });

            if(!response.ok){
                throw new Error("Error fetching the data from weatherunion.com");
            }
            const data = await response.json();
            console.log("Data fetched from weatherunion.com", data);

            return data;
        } catch (error: any) {
            console.log("Error fetching the data from weatherunion.com", error?.message);
            throw error;
        }
    }
);

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setSuggestions: (state, action) => {
            state.suggestions = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                state.weatherData = action.payload;
                state.loading = false;
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.error = action.error?.message || "Error fetching the data from weatherunion.com";
                state.loading = false;
            })
    }
});


export const {setSearchQuery, setSuggestions} = weatherSlice.actions;
export default weatherSlice.reducer;
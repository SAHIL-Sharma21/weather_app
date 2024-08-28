import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface FetchWeatherDataError {
    error: string;
}


export interface Weather {
    searchQuery: string;
    suggestions: string[];
    weatherData: any | null;
    error: string | null;
    loading: boolean;
}

const initialState: Weather = {
    loading: false,
    error:null,
    searchQuery: "",
    weatherData: null,
    suggestions: [],
};

// Fetch weather data
export const fetchWeatherData = createAsyncThunk<
    any,  
    string, 
    {
        rejectValue: FetchWeatherDataError 
    }
>(
    'weather/fetchWeatherData',
    async (placeName: string, thunkAPI) => {
        try {
            // Fetch weather data directly
            const weatherResponse = await fetch(`/api/weatherapi?placeName=${encodeURIComponent(placeName)}`);
            if (!weatherResponse.ok) {
                const error = await weatherResponse.json();
                return thunkAPI.rejectWithValue({ error: error.message || "Failed to fetch weather data" });
            }

            const data = await weatherResponse.json();
            console.log("Data fetched from API", data);

            return data;

        } catch (error: any) {
            console.log("Error fetching the data", error?.message);
            return thunkAPI.rejectWithValue({ error: error?.message || "An error occurred" });
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
                state.error = action.payload?.error || "Error fetching the data from weatherunion.com";
                state.loading = false;
            });
    }
});

export const { setSearchQuery, setSuggestions } = weatherSlice.actions;
export default weatherSlice.reducer;
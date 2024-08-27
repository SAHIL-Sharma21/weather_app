
import {configureStore} from '@reduxjs/toolkit'
import WeatherSlice from '@/store/weatherSlice'

const store = configureStore({
    reducer: {
        weather: WeatherSlice
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
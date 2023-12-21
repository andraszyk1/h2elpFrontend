import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import usersReducer from './slices/usersSlice'
import authReducer from './slices/authSlice'
import ticketsReducer from './slices/ticketsSlice'
import categoriesReducer from './slices/categoriesSlice'
import { mainApi } from './api/mainApi'

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    tickets: ticketsReducer,
    categories: categoriesReducer,
    [mainApi.reducerPath]: mainApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(mainApi.middleware)
})
setupListeners(store.dispatch)

export default store;
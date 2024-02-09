import { createSlice } from "@reduxjs/toolkit";
// const initialUser=localStorage.getItem('usersAD')?JSON.parse(localStorage.getItem('users')):[]

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        usersToFilter: [],
        resultUsers: [],
        search: "",
        searchtest: ""
    },
    reducers: {
        setSearch(state, { payload }) {
            state.search = payload.toLowerCase()
        },
     
    },


})

export const { setSearch } = usersSlice.actions
export default usersSlice.reducer
export const selectSearch = state => state.users.search


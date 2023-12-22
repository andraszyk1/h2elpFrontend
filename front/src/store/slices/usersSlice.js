import { createSlice, current, } from "@reduxjs/toolkit";
// const initialUser=localStorage.getItem('usersAD')?JSON.parse(localStorage.getItem('users')):[]

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        usersToFilter: [],
        resultUsers: [],
        search: "",
        searchtest:""
    },
    reducers: {

         setSearch(state, action) {
            state.search = action.payload.toLowerCase()
        },
        setSearchTest(state, action) {
            state.searchtest = action.payload.toLowerCase()
        },

    },


})
const selectSearch = state => state.users.search
const selectTestSearch = state => state.users.searchtest
export { selectSearch,selectTestSearch }
export const {setSearch,setSearchTest } = usersSlice.actions
export default usersSlice.reducer



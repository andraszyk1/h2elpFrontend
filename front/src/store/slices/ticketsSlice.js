import { createSlice } from "@reduxjs/toolkit";

export const ticketsSlice = createSlice({
    name: "tickets",
    initialState: {
        ticketsToFilter: [],
        resultTickets: [],
        filters: {},
        search: "",
        sort: {},
        checkedTickets: [],
        disableInputCheck:false

    },
    reducers: {
        setCheckedTickets(state, { payload }) {
            if (state.checkedTickets?.indexOf(payload) !== -1)
                state.checkedTickets = state.checkedTickets.filter(item => item !== payload)
            else
                state.checkedTickets = [...state.checkedTickets, payload]
        },
        setAllCheckedTickets(state, { payload }) {
            state.checkedTickets = payload
        },
        setButtonAllTicketsChecked(state,{payload}){
            state.disableInputCheck=payload
        },
        removeCheckedTickets(state) {
            state.checkedTickets = []
        },
        setTicketsToFilter(state, { payload }) {
            state.ticketsToFilter = payload
            state.resultTickets = payload
        },
        setSort(state, { payload }) {
            let tempResult = state.resultTickets
            const { sortValue, sortType } = payload
            state.sort = { sortValue, sortType }
            let sortedResult

            if (sortType === 'asc') {
                sortedResult = tempResult.sort((a, b) => {
                    let x = sortValue(a).toLowerCase();
                    let y = sortValue(b).toLowerCase();
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;

                })
            }

            if (sortType === 'desc') {
                sortedResult = tempResult.sort((a, b) => {
                    let x = sortValue(a).toLowerCase();
                    let y = sortValue(b).toLowerCase();
                    if (x > y) { return -1; }
                    if (x < y) { return 1; }
                    return 0;

                })
            }

            state.resultTickets = sortedResult
        },
        setFiltersToTickets(state, { payload }) {
            state.filters = {...state.filters,...payload}

        },
        clearFilters(state) {
            state.filters = {}
            state.resultTickets = state.ticketsToFilter
            state.search = ""
        },
        setSearch(state, { payload }) {
            state.search = payload
        }

    },

})
const selectCheckedTickets = state => state.tickets.checkedTickets
const selectSerch = state => state.tickets.search
const selectFilters = state => state.tickets.filters
const selectDisableInputCheck = state => state.tickets.disableInputCheck

export { selectDisableInputCheck,selectCheckedTickets, selectFilters, selectSerch };
export const { setButtonAllTicketsChecked,setSort, searchTickets, setFiltersToTickets, setTicketsToFilter, setAllCheckedTickets, setCheckedTickets, removeCheckedTickets, clearFilters, setSearch } = ticketsSlice.actions
export default ticketsSlice.reducer

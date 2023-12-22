import { createSlice, current } from "@reduxjs/toolkit";
const getResultAfterFilter = ({ category, status }, tempResult) => {
    if (category) {
        tempResult = tempResult.filter(ticket => ticket.Category.name.toLowerCase().includes(category.toLowerCase()))
    }
    if (status) {
        tempResult = tempResult.filter(ticket => ticket.status.toLowerCase().includes(status.toLowerCase()))
    }
    return tempResult
}


export const ticketsSlice = createSlice({
    name: "tickets",
    initialState: {
        ticketsToFilter: [],
        resultTickets: [],
        filters: {},
        search: "",
        sort: {},
        checkedTickets: [],

    },
    reducers: {
        setCheckedTickets(state, action) {
            if (state.checkedTickets?.indexOf(action.payload) !== -1)
                state.checkedTickets = state.checkedTickets.filter(item => item !== action.payload)
            else
                state.checkedTickets = [...state.checkedTickets, action.payload]
        },
        setAllCheckedTickets(state, action) {
            state.checkedTickets = action.payload
        },
        removeCheckedTickets(state) {
            state.checkedTickets = []
        },
        setTicketsToFilter(state, action) {
            state.ticketsToFilter = action.payload
            state.resultTickets = action.payload
        },
        setSort(state, action) {
            let tempResult = state.resultTickets
            const { sortValue, sortType } = action.payload
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
        setFiltersToTickets(state, action) {
            state.filters = action.payload
          
        },
        clearFilters(state, action) {
            state.filters = {}
            state.resultTickets = state.ticketsToFilter
            state.search = ""
        },
        setSearch(state, action) {
            state.search = action.payload
        }

    },

})
const selectCheckedTickets = state => state.tickets.checkedTickets
const selectSerch = state => state.tickets.search
const selectFilters = state => state.tickets.filters

export {  selectSerch, selectCheckedTickets, selectFilters };
export const { setSort, searchTickets, setFiltersToTickets, setTicketsToFilter, setAllCheckedTickets, setCheckedTickets, removeCheckedTickets, clearFilters, setSearch } = ticketsSlice.actions
export default ticketsSlice.reducer

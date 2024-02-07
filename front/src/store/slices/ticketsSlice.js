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
        setCheckedTickets(state, { payload }) {
            if (state.checkedTickets?.indexOf(payload) !== -1)
                state.checkedTickets = state.checkedTickets.filter(item => item !== payload)
            else
                state.checkedTickets = [...state.checkedTickets, payload]
        },
        setAllCheckedTickets(state, { payload }) {
            state.checkedTickets = payload
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
            state.filters = payload

        },
        clearFilters(state, { payload }) {
            state.filters = payload ?? {}
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

export { selectSerch, selectCheckedTickets, selectFilters };
export const { setSort, searchTickets, setFiltersToTickets, setTicketsToFilter, setAllCheckedTickets, setCheckedTickets, removeCheckedTickets, clearFilters, setSearch } = ticketsSlice.actions
export default ticketsSlice.reducer

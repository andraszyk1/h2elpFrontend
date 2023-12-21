import { createSlice, createSelector, createAction, current } from "@reduxjs/toolkit";
import { mainApi } from "../api/mainApi";

const actionFind = createAction("findTickets")

export const ticketsSlice = createSlice({
    name: "tickets",
    initialState: {
        ticketsToFilter: [],
        resultTickets: [],
        filters: {},
        search: "",
        sort:{},
        checkedTickets : [],

    },
    reducers: {
        setCheckedTickets(state,action){
            if (state.checkedTickets?.indexOf(action.payload) !== -1)
                state.checkedTickets=state.checkedTickets.filter(item => item !== action.payload)
            else
            state.checkedTickets=[...state.checkedTickets,action.payload]
        },
        removeCheckedTickets(state,action){
        state.checkedTickets=action.payload
         
        },
        setTicketsToFilter(state, action) {
            state.ticketsToFilter = action.payload
            state.resultTickets = action.payload
        },
        setSort(state,action){

            let tempResult=state.resultTickets
            // console.log(current(tempResult));
            const {sortValue,sortType}=action.payload
            state.sort={sortValue,sortType}
            let sortedResult
         
            if(sortType==='asc'){
            sortedResult=tempResult.sort((a,b)=>{
                let x = sortValue(a).toLowerCase();
                let y = sortValue(b).toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
                   
            })}
            
            if(sortType==='desc'){
                sortedResult=tempResult.sort((a,b)=>{
                let x = sortValue(a).toLowerCase();
                let y = sortValue(b).toLowerCase();
                if (x > y) {return -1;}
                if (x < y) {return 1;}
                return 0;
           
            })}

            state.resultTickets=sortedResult
        },
        setFiltersToTickets(state, action) {
            state.filters = action.payload
            const {category,status}=state.filters
            let tempResult=state.ticketsToFilter
            if (state.search.length > 0) {
                tempResult= tempResult.filter(ticket =>ticket.temat.toLowerCase().includes(state.search))           
                tempResult=tempResult.filter(ticket=>ticket.Category.name.toLowerCase().includes(category.toLowerCase())
                    && ticket.status.toLowerCase().includes(status.toLowerCase()))
              
            } 
            else if (state.search.length === 0) 
            {   
                if(category){
                tempResult=tempResult.filter(ticket=>ticket.Category.name.toLowerCase().includes(category.toLowerCase()))
            }
            if(status){
                tempResult=tempResult.filter(ticket=>ticket.status.toLowerCase().includes(status.toLowerCase()))
                }
            }
            state.resultTickets=tempResult
        },
        clearFilters(state, action) {
            state.filters = {}
            state.resultTickets = state.ticketsToFilter
            state.search= ""
        

        },
        setSearch(state, action) {
            state.search = action.payload
            const isFilter = Object.keys(current(state.filters)).some(x => x !== '');
            const len=state.search.length
            let tempResult=state.ticketsToFilter
            const {category,status}=state.filters
            if (isFilter===false && state.search.length > 0) {
                tempResult = tempResult.filter(ticket =>
                    ticket.temat.toLowerCase().includes(state.search.toLowerCase()))}

            else if (isFilter===true && state.search.length === 0) {
                tempResult=tempResult.filter(ticket=>ticket.Category.name.toLowerCase().includes(category.toLowerCase())
                && ticket.status.toLowerCase().includes(status.toLowerCase()))
            } 
            else if(isFilter===false && state.search.length ===0){
                tempResult = state.ticketsToFilter
            }
            else if(isFilter===true && state.search.length >0){
                tempResult=tempResult.filter(ticket =>ticket.temat.toLowerCase().includes(state.search))
                tempResult=tempResult.filter(ticket=>ticket.Category.name.toLowerCase().includes(category.toLowerCase())
                && ticket.status.toLowerCase().includes(status.toLowerCase()))
              
            }
            state.resultTickets=tempResult
        },

    },

})
const selectFilteredTickets = state => state.tickets.resultTickets
const selectCheckedTickets = state => state.tickets.checkedTickets
const selectSerch = state => state.tickets.search

export { selectFilteredTickets, selectSerch,selectCheckedTickets };
export const { setSort,searchTickets, setFiltersToTickets, setTicketsToFilter,setCheckedTickets,removeCheckedTickets, clearFilters, setSearch } = ticketsSlice.actions
export default ticketsSlice.reducer

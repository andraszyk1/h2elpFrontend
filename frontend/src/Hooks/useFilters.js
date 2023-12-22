import React from 'react'
export default useFilters=({category,status},tempResult)=>{
    if (category) {
        tempResult = tempResult.filter(ticket => ticket.Category.name.toLowerCase().includes(category.toLowerCase()))
    }
    if (status) {
        tempResult = tempResult.filter(ticket => ticket.status.toLowerCase().includes(status.toLowerCase()))
    }
}
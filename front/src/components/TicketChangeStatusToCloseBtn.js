import React from 'react'
import { useUpdateTicketStatusMutation } from "../store/api/mainApi";
import { MdStop } from "react-icons/md";
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeCheckedTickets } from '../store/slices/ticketsSlice';
function TicketChangeStatusToCloseBtn({ ticketIds,children }) {
  const dispatch=useDispatch()
  const [updateTicketStatus] = useUpdateTicketStatusMutation();
  
  const handleUpdateStatusToClose = async (ticketIds) => {
    try {
      
      await updateTicketStatus({ id:ticketIds, status: "Zamknięte" }).unwrap()
      dispatch(removeCheckedTickets())
    } catch (error) {
      console.log(error);
    }
  }
  return (

   
      <span className='m-2'>
       <Button variant='dark' size='sm' onClick={()=>handleUpdateStatusToClose(ticketIds)} style={{cursor:'pointer'}}>   <small> <MdStop/>{children}</small></Button>
     
      </span>
   

  )
}

export default TicketChangeStatusToCloseBtn
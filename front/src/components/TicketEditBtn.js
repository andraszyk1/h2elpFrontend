import React from 'react'
import {AiFillEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
function TicketEditBtn({ ticketId }) {
    const navigate = useNavigate();
    const handleEditTicket = () => {
        navigate(`/tickets/edit/${ticketId}`)
    }
    return (
    <AiFillEdit style={{cursor:'pointer'}}  onClick={handleEditTicket}/>
    )           
}

export default TicketEditBtn;
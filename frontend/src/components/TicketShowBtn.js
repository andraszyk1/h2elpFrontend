import React from 'react'

import {AiOutlineEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
function TicketShowBtn({ ticketId }) {
    const navigate = useNavigate();
    const handleEditTicket = () => {
        navigate(`/tickets/${ticketId}`)
    }
    return (
        <>
        <AiOutlineEye style={{cursor:'pointer'}}  onClick={handleEditTicket}/>    
        </>
    )
}

export default TicketShowBtn;
import React from 'react'
import { IoAddOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';

function TicketPostAddBtn({ ticketId }) {
    const navigate = useNavigate();
    const handleEditTicket = () => {
        navigate(`/tickets/post/add/${ticketId}`)
    }
    return (<>
     <IoAddOutline style={{cursor:'pointer',height:'2rem',width:'2rem'}} className="bg-light"  title="Dodaj komentarz" onClick={handleEditTicket}/>{" "}
    </>
    )           
}

export default TicketPostAddBtn;
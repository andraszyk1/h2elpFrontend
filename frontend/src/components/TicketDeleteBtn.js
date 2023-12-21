import React from 'react'

import { useDeleteTicketMutation } from '../store/api/mainApi'
import { AiFillDelete } from 'react-icons/ai';
function TicketDeleteBtn({ ticketId }) {
    const [deleteTicket, { isLoading: isLoadingDeleteTicket }] = useDeleteTicketMutation();
    const handleDeleteTicket = async () => {
        console.log("handleDeleteTicket");
        try {
            await deleteTicket(ticketId)
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            {!isLoadingDeleteTicket && <AiFillDelete style={{cursor:'pointer'}} onClick={handleDeleteTicket}/>}
        </>
    )
}

export default TicketDeleteBtn;
import React from 'react'
import { useDeleteTicketMutation,useUpdateTicketMutation, useUpdateTicketStatusMutation } from "../store/api/mainApi";
import { AiFillDelete, AiFillEdit, AiOutlineUsergroupAdd,AiOutlineUserAdd } from 'react-icons/ai';
import { BsPlayFill } from 'react-icons/bs';
import { MdStop } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { Button,  Container,  Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
function TicketPanelActions({ ticket }) {
  const navigate = useNavigate();
  const account=useSelector(state=>state.auth.loggedUser);
  const [deleteTicket] = useDeleteTicketMutation();
  const [updateTicket] = useUpdateTicketMutation();
  const [updateTicketStatus] = useUpdateTicketStatusMutation();
  const handleDeleteTicket = async () => {
    try {
      await deleteTicket(ticket.id)
      navigate('/tickets')
    } catch (error) {
      console.error(error);
    }
  }

  const handleEditTicket = async () => {
    navigate(`/tickets/edit/${ticket?.id}`)
  }
  const handleGoToAcceptPage = async () => {
    navigate(`/tickets/accept/${ticket?.id}`)
  }


  const handleSubscribeTicketToMe = async (ticketId) => {
    try {
     
        const newTicket={id:ticketId,opiekunowie:[{login:account.login}]}
        await updateTicket(newTicket).unwrap()
        
    } catch (error) {
      console.log(error);
    }
  }
  const handleUpdateStatusToRenew = async (ticketId) => {
    try {
      await updateTicketStatus({ id:ticketId, status:"Wznowione"}).unwrap()
    } catch (error) {
      console.log(error);
    }
  }
  const handleUpdateStatusToClose = async (ticketId) => {
    try {
      await updateTicketStatus({ id:ticketId, status: "Zamknięte" }).unwrap()
    
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container style={{display:'flex',justifyContent:'space-evenly'}}> 
      <Button disabled={ticket?.status==="Wznowione"?true :false } className="m-1" size='lg' title="Wznów" variant='light' onClick={()=>handleUpdateStatusToRenew(ticket.id)}><BsPlayFill/> </Button>
      <Button disabled={ticket?.status==="Zamknięte" ?true : false} className="m-1" size='lg' title="Zamknij" variant='light' onClick={()=>handleUpdateStatusToClose(ticket.id)}><MdStop/> </Button>
      <Button className="m-1" size="md" title="Edytuj" variant="light" onClick={handleEditTicket}> <AiFillEdit /> Edytuj</Button>
      <Button className="m-1" size="md" variant="light" title="Przypisz Do mnie" onClick={()=>handleSubscribeTicketToMe(ticket.id)}><AiOutlineUserAdd /> Przypisz do mnie</Button>
      <Button className="m-1" size="md" variant="light" title="Dodaj Akceptację" onClick={handleGoToAcceptPage}><AiOutlineUsergroupAdd /> Dodaj akceptację</Button>
      <Button className="m-1" size="md" title="Usuń" variant="danger" onClick={handleDeleteTicket}> <AiFillDelete/></Button>  
    </Container>
</Navbar>
  )
}

export default TicketPanelActions
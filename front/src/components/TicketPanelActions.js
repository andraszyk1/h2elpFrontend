import React from 'react'
import { useDeleteTicketMutation, useUpdateTicketMutation, useUpdateTicketStatusMutation } from "../store/api/mainApi";
import { AiFillDelete, AiFillEdit, AiOutlineUserAdd } from 'react-icons/ai';
import { BsPlayFill } from 'react-icons/bs';
import { MdStop } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { setShowToast } from '../store/slices/toastSlice';
function TicketPanelActions({ ticket }) {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const account = useSelector(state => state.auth.loggedUser);
  const [deleteTicket] = useDeleteTicketMutation();
  const [updateTicket] = useUpdateTicketMutation();
  const [updateTicketStatus] = useUpdateTicketStatusMutation();
  const handleDeleteTicket = async () => {
    try {
      await deleteTicket(ticket.id)
      dispatch(setShowToast({showToast: true, message: `Zgłoszenie nr ${ticket.id} zostało usunięte`, variant: 'danger'} ))
      navigate('/tickets')
    } catch (error) {
      console.error(error);
    }
  }

  const handleEditTicket = async () => {
    navigate(`/tickets/edit/${ticket?.id}`)
  }



  const handleSubscribeTicketToMe = async (ticketId) => {
    try {

      const newTicket = { id: ticketId, opiekunowie: [account.login] }
      await updateTicket(newTicket).unwrap()
      dispatch(setShowToast({showToast: true, message: `Opiekun ${account.login} dodany do zgłoszenia nr ${ticketId}`, variant: 'info'} ))
    } catch (error) {
      console.log(error);
    }
  }
  const handleUpdateStatusToRenew = async (ticketId) => {
    try {
      await updateTicketStatus({ id: [ticketId], status: "Wznowione" }).unwrap()
      dispatch(setShowToast({showToast: true, message: `Zgłoszenie nr ${ticketId} zostało wznowione`, variant: 'warning'} ))
    } catch (error) {
      console.log(error);
    }
  }
  const handleUpdateStatusToClose = async (ticketId) => {
    try {
      await updateTicketStatus({ id: [ticketId], status: "Zamknięte" }).unwrap()
      dispatch(setShowToast({showToast: true, message: `Zgłoszenie nr ${ticketId} zostało zamknięte`, variant: 'warning'} ))
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Button className="m-1" size='sm' title="Wznów" variant='light' disabled={ticket?.status === "Wznowione" ? true : false} onClick={() => handleUpdateStatusToRenew(ticket.id)}><BsPlayFill />Wznów zgłoszenie </Button>
        <Button className="m-1" size='sm' title="Zamknij" variant='light' disabled={ticket?.status === "Zamknięte" ? true : false} onClick={() => handleUpdateStatusToClose(ticket.id)}><MdStop /> Zamknij zgłoszenie </Button>
        <Button className="m-1" size="sm" title="Edytuj" variant="light" onClick={handleEditTicket}> <AiFillEdit /> Edytuj</Button>
        <Button className="m-1" size="sm" title="Przypisz Do mnie" variant="light" onClick={() => handleSubscribeTicketToMe(ticket.id)}><AiOutlineUserAdd /> Przypisz do mnie</Button>
        <Button className="m-1" size="sm" title="Usuń" variant="light" onClick={handleDeleteTicket}> <AiFillDelete />Usuń</Button>
      </Container>
    </Navbar>
  )
}

export default TicketPanelActions
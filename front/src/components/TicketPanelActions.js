import { Container, Navbar } from 'react-bootstrap';
import { AiFillDelete, AiFillEdit, AiOutlineUserAdd } from 'react-icons/ai';
import { BsPlayFill } from 'react-icons/bs';
import { MdStop } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDeleteTicketMutation, useUpdateTicketMutation, useUpdateTicketStatusMutation } from "../store/api/mainApi";
import { setShowToast } from '../store/slices/toastSlice';
import { Box, Flex, IconButton, Button, Stack, ButtonGroup } from '@chakra-ui/react';
function TicketPanelActions({ ticket }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const account = useSelector(state => state.auth.loggedUser);
  const [deleteTicket] = useDeleteTicketMutation();
  const [updateTicket] = useUpdateTicketMutation();
  const [updateTicketStatus] = useUpdateTicketStatusMutation();
  const handleDeleteTicket = async () => {
    try {
      await deleteTicket(ticket.id)
      dispatch(setShowToast({ showToast: true, message: `Zgłoszenie nr ${ticket.id} zostało usunięte`, variant: 'danger' }))
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
      dispatch(setShowToast({ showToast: true, message: `Opiekun ${account.login} dodany do zgłoszenia nr ${ticketId}`, variant: 'info' }))
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateStatusToRenew = async (ticketId) => {
    try {
      await updateTicketStatus({ id: [ticketId], status: "Wznowione" }).unwrap()
      dispatch(setShowToast({ showToast: true, message: `Zgłoszenie nr ${ticketId} zostało wznowione`, variant: 'warning' }))
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateStatusToClose = async (ticketId) => {
    try {
      await updateTicketStatus({ id: [ticketId], status: "Zamknięte" }).unwrap()
      dispatch(setShowToast({ showToast: true, message: `Zgłoszenie nr ${ticketId} zostało zamknięte`, variant: 'warning' }))
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <ButtonGroup overflow='hidden' variant='outline' mr={{base:'40px'}}   size='sm' colorScheme='blue' gap={{base:'1',md:'1'}}  spacing={{base:'0',md:'2'}}   p={{base:'0px',md:'1rem'}}  minW={{base:'100%'}} flexDirection={{base:'column',md:'row'}}>
        <Button leftIcon={<BsPlayFill/>} isDisabled={ticket?.status === "Wznowione" ? true : false} onClick={() => handleUpdateStatusToRenew(ticket.id)}>Wzów</Button>
        <Button leftIcon={<MdStop />} isDisabled={ticket?.status === "Zamknięte" ? true : false} onClick={() => handleUpdateStatusToClose(ticket.id)}>Zamknij</Button>
        <Button leftIcon={<AiFillEdit />} onClick={handleEditTicket}>Edytuj</Button>
        <Button leftIcon={<AiOutlineUserAdd />} onClick={() => handleSubscribeTicketToMe(ticket.id)}>Przypisz do mnie</Button>
        <Button leftIcon={<AiFillDelete />} colorScheme='red' onClick={handleDeleteTicket}>Usuń</Button>
      </ButtonGroup>
  
  )
}

export default TicketPanelActions
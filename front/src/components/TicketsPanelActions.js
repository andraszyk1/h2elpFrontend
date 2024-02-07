import { useEffect, useState } from 'react';
import { Button, Container, Navbar, Spinner } from 'react-bootstrap';
import { AiFillDelete, AiOutlineUserAdd } from 'react-icons/ai';
import { IoAddOutline } from 'react-icons/io5';
import { MdStop } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDeleteTicketMutation, useUpdateTicketMutation, useUpdateTicketStatusMutation } from "../store/api/mainApi";
import { selectCheckedTickets, setAllCheckedTickets } from '../store/slices/ticketsSlice';
import { TicketSearch } from './TicketSearch';
import { setShowToast } from '../store/slices/toastSlice';
function TicketsPanelActions({ ticket }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const account = useSelector(state => state.auth.loggedUser);
  const checkedTickets = useSelector(selectCheckedTickets);
  const [deleteTicket,{ isLoading: isLoadingDelete }] = useDeleteTicketMutation();
  const [updateTicket, { isLoading: isLoadingUpdate }] = useUpdateTicketMutation();
  const [updateTicketStatus, { isLoading: isLoadingUpdateStatus }] = useUpdateTicketStatusMutation();
  const [activeBtn, setActiveBtn] = useState(true)
  useEffect(() => {
    if (Array.from(checkedTickets).length > 0) {
      setActiveBtn(false)
    } else { setActiveBtn(true) }
  }, [checkedTickets])
  const handleDeleteCheckedTicket = async () => {
    try {
      checkedTickets?.map(async (checkedTicket)=>{
      await deleteTicket(checkedTicket)
    })
    dispatch(setShowToast({showToast: true, message: `Zgłoszenia nr ${Array.from(checkedTickets).join(",")} zostały usunięte `, variant: 'danger'} ))
    dispatch(setAllCheckedTickets([]))
    } catch (error) {
      console.error(error);
    }
  }

  const handleInsertTicket = () => {
    navigate('/tickets/add')
  }

  const handleSubscribeTicketToMe = async () => {
    try {
      checkedTickets?.map(async (checkedTicket)=>{
        const newTicket = { id: checkedTicket, opiekunowie: [account.login] }
        await updateTicket(newTicket).unwrap()
       
      })
      dispatch(setShowToast({showToast: true, message: `Zgłoszenia nr ${Array.from(checkedTickets).join(",")} zostały przypisane do ${account.login}`, variant: 'info'} ))
      dispatch(setAllCheckedTickets([]))
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateStatusToClose = async () => {
    try {
      await updateTicketStatus({ id: checkedTickets, status: "Zamknięte" })
      dispatch(setShowToast({showToast: true, message: `Zgłoszenia nr ${Array.from(checkedTickets).join(",")} zostały zamknięte`, variant: 'warning'} ))
      dispatch(setAllCheckedTickets([]))
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Button className="m-1" size='md' title='Dodaj zgłoszenie' variant='light' onClick={handleInsertTicket}> <IoAddOutline/> Dodaj Zgłoszenie </Button>

        <Button className="m-1" size='md' title="Zamknij" variant='light' disabled={activeBtn} style={ activeBtn ? {fontWeight:'500'} :{fontWeight:'600'}} onClick={handleUpdateStatusToClose}>
          {isLoadingUpdateStatus ? <Spinner size='sm' /> : <MdStop />} Zamknij zgłoszenia
        </Button>

        <Button className="m-1" size="md" title="Przypisz Do mnie" variant="light" disabled={activeBtn} style={ activeBtn ? {fontWeight:'500'} :{fontWeight:'600'}} onClick={handleSubscribeTicketToMe}>
          {isLoadingUpdate ? <Spinner size='sm' /> : <AiOutlineUserAdd />} Przypisz do mnie
        </Button>
        <Button className="m-1" size="md" title="Usuń" variant="light" disabled={activeBtn} style={ activeBtn ? {fontWeight:'500'} :{fontWeight:'600'}} onClick={handleDeleteCheckedTicket}> 
        {isLoadingDelete ? <Spinner size='lg' /> : <AiFillDelete />} Usuń zaznaczone
          </Button>
        <TicketSearch />
      </Container>
    </Navbar>
  )
}

export default TicketsPanelActions
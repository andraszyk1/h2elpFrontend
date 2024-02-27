import { Button, ButtonGroup } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiFillDelete, AiOutlineUserAdd } from 'react-icons/ai';
import { IoAddOutline } from 'react-icons/io5';
import { MdStop } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDeleteTicketMutation, useUpdateTicketMutation, useUpdateTicketStatusMutation } from "../store/api/mainApi";
import { selectCheckedTickets, setAllCheckedTickets, setButtonAllTicketsChecked } from '../store/slices/ticketsSlice';
import { setShowToast } from '../store/slices/toastSlice';
function TicketsPanelActions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const account = useSelector(state => state.auth.loggedUser);
  const checkedTickets = useSelector(selectCheckedTickets);

  const [deleteTicket, { isLoading: isLoadingDelete }] = useDeleteTicketMutation();
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
      checkedTickets?.map(async (checkedTicket) => {
        await deleteTicket(checkedTicket)
      })
      dispatch(setShowToast({ showToast: true, message: `Zgłoszenia nr ${Array.from(checkedTickets).join(",")} zostały usunięte `, variant: 'danger' }))
      dispatch(setAllCheckedTickets([]))
      dispatch(setButtonAllTicketsChecked(false))
    } catch (error) {
      console.error(error);
    }
  }

  const handleInsertTicket = () => {
    navigate('/tickets/add')
  }

  const handleSubscribeTicketToMe = async () => {
    try {
      checkedTickets?.map(async (checkedTicket) => {
        const newTicket = { id: checkedTicket, opiekunowie: [account.login] }
        console.log(newTicket);
        await updateTicket(newTicket).unwrap()

      })
      dispatch(setShowToast({ showToast: true, message: `Zgłoszenia nr ${Array.from(checkedTickets).join(",")} zostały przypisane do ${account.login}`, variant: 'info' }))
      dispatch(setAllCheckedTickets([]))
      dispatch(setButtonAllTicketsChecked(false))
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateStatusToClose = async () => {
    try {
      await updateTicketStatus({ id: checkedTickets, status: "Zamknięte" })
      dispatch(setShowToast({ showToast: true, message: `Zgłoszenia nr ${Array.from(checkedTickets).join(",")} zostały zamknięte`, variant: 'warning' }))
      dispatch(setAllCheckedTickets([]))
      dispatch(setButtonAllTicketsChecked(false))
    } catch (error) {
      console.log(error);
    }
  }
  return (<>
    <ButtonGroup overflow='hidden' variant='outline' mr={{ base: '40px' }} size='sm' colorScheme='blue' gap={{ base: '1', md: '1' }} spacing={{ base: '0', md: '2' }} p={{ base: '0px', md: '1rem' }} minW={{ base: '100%' }} flexDirection={{ base: 'column', md: 'row' }}>
      <Button leftIcon={<IoAddOutline />} onClick={handleInsertTicket}>Dodaj Zgłoszenie</Button>
      <Button leftIcon={<MdStop />} isDisabled={activeBtn} onClick={handleUpdateStatusToClose} isLoading={isLoadingUpdateStatus}>Zamknij</Button>
      <Button leftIcon={<AiOutlineUserAdd />} isDisabled={activeBtn} onClick={handleSubscribeTicketToMe} isLoading={isLoadingUpdate}>Przypisz do mnie</Button>
      <Button leftIcon={<AiFillDelete />} isDisabled={activeBtn} colorScheme='red' onClick={handleDeleteCheckedTicket} isLoading={isLoadingDelete}>Usuń</Button>
    </ButtonGroup>
  </>
  )
}

export default TicketsPanelActions
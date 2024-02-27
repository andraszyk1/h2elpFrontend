
import { IconButton } from '@chakra-ui/react';
import { AiFillDelete } from 'react-icons/ai';
import { useDeleteTicketMutation } from '../store/api/mainApi';
function TicketDeleteBtn({ ticketId }) {
    const [deleteTicket, { isLoading }] = useDeleteTicketMutation();
    const handleDeleteTicket = async () => {
        try {
            await deleteTicket(ticketId)
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <IconButton isRound={true}
            variant='ghost'
            size='xs'
            colorScheme='red'
            aria-label='Usuń'
            fontSize='20px'
            icon={<AiFillDelete />}
            onClick={handleDeleteTicket}
            isLoading={isLoading}
        />
    )
}

export default TicketDeleteBtn;
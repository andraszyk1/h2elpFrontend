import { IconButton } from '@chakra-ui/react';
import { AiOutlineEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
function TicketShowBtn({ ticketId }) {
    const navigate = useNavigate();
    const handleEditTicket = () => {
        navigate(`/tickets/${ticketId}`)
    }
    return (
        <IconButton
            isRound={true}
            size='xs'
            variant='ghost'
            colorScheme='cyan'
            aria-label='Pokaż Szczegóły Zgłoszenia'
            fontSize='20px'
            icon={<AiOutlineEye />}
            onClick={handleEditTicket}
        />

    )
}

export default TicketShowBtn;
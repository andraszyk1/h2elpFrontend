import { IconButton } from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
function TicketEditBtn({ ticketId }) {
    const navigate = useNavigate();
    return (
        <IconButton isRound={true}
            variant='ghost'
            size='xs'
            colorScheme='green'
            aria-label='Edytuj'
            fontSize='20px'
            icon={<AiFillEdit />}
            onClick={()=>navigate(`/tickets/edit/${ticketId}`)}
        />
    )
}

export default TicketEditBtn;
import React, {  useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { TbSquareArrowUp, TbSquareArrowDown } from 'react-icons/tb'
import { TimeAgo } from "./TimeAgo";
import {Link,useNavigate} from 'react-router-dom'
import { useDeleteTicketMutation } from "../store/api/mainApi";
export function Ticket({ ticket }) {
    const navigate = useNavigate();
    const [isExtended, setIsExtended] = useState(false);
    const [deleteTicket,{isLoading:isLoadingDeleteTicket}]= useDeleteTicketMutation();
    const handleDeleteTicket = async () => {
        console.log("handleDeleteTicket");
        try {
            await deleteTicket(ticket.id)
        } catch (error) {
            console.error(error);
        }
    }

    const handleEditTicket = () => {
        navigate(`/tickets/edit/${ticket.id}`)
    }
  

   
  
    const linkStyle = {
        margin: "1rem",
        textDecoration: "none",
        color: 'blue'
      };
    

    return (
    
        <Card className="mb-2 mt-2 shadow">
            
            <Card.Body>
                <Card.Title >
                    <Row><Col sm={8}>
                        {!isExtended ? <TbSquareArrowDown title="Rozwiń" onClick={() => setIsExtended(!isExtended)} /> : <TbSquareArrowUp title="Rozwiń" onClick={() => setIsExtended(!isExtended)} />}
                        <Link to={`/tickets/${ticket.id}`} style={linkStyle} title="Szczegóły zgłoszenia"> {ticket.temat} </Link>
                    </Col>
                        <Col sm={2}>
                            <Row>
                            {/* <TicketChangeStatusSelect ticket={ticket}/> */}
                            </Row>
                        </Col>
                        <Col sm={2}>
                            <Button className="m-1" size="sm" title="Usuń" variant="info" onClick={handleDeleteTicket}>{isLoadingDeleteTicket?<Spinner size="sm"/>:<AiFillDelete />}</Button>
                            <Button className="m-1" size="sm" title="Edytuj" variant="info" onClick={handleEditTicket}> <AiFillEdit /></Button>
    
                        </Col>
                    </Row>
                </Card.Title>

                {isExtended &&
                    <>

                        <Card.Subtitle>Kategoria : {ticket?.Category?.name} </Card.Subtitle>

                        <Card.Text>
                            <Card.Img src="" defaultValue="image"></Card.Img>
                            Zgłaszający : {ticket?.zglaszajacy.name}
                            Treść : {ticket.tresc}
                        </Card.Text>
                        <Card.Footer>Utworzył: {ticket?.tworca?.name} <TimeAgo timestamp={ticket?.createdAt} /> Zaktualizowano :  <TimeAgo timestamp={ticket?.updatedAt} /></Card.Footer>


                    </>
                }
            </Card.Body>
        </Card>
         
    
    );
}

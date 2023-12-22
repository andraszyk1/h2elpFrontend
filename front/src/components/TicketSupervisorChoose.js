import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { insertTicket } from '../store/slices/ticketsSlice';
import { useDispatch } from 'react-redux';
export function TicketSupervisorChoose({ props }) {
    const dispatch = useDispatch();

    const categoriesOptions = [
        { label: 'Zasoby sieciowe', value: 'network_resources' },
        { label: 'Nowy użytkownik', value: 'new_user' },
        { label: 'Usterka Drukarki', value: 'printer_disable' },
      ];
    const [newTicket, setNewTicket] = useState({
        temat: "test", kategoria: "Zasoby sieciowe", autor: "test.testowe@test.test",
        firma: "TYCHY 1", opiekunowie: "Jan Kowalski", status: "Zamknięte", tresc: "Prosze o rozwiażanie zgłoszenia testowego !"
    })
    const handleInputChange = (event) => {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setNewTicket({
            ...newTicket,
            [name]: value
        });


    };
    const handleSubmit = (event) => {
        event.preventDefault();
        props.setShowTicketAddForm(!props.showTicketAddForm);
        props.setShowTicketsContent(!props.hideTicketsContent);
        dispatch(insertTicket(newTicket));
    }
    return (
        
        <Form onSubmit={handleSubmit}>
            {console.log(newTicket)}
            <Form.Group>
                <Form.Label>Opiekun</Form.Label>
                <Form.Select 
                    required
                    type="select"
                    placeholder="opiekun"
                    name="opiekun"
                    
                    onChange={handleInputChange}
                    >
                    {categoriesOptions.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                      </Form.Select>
                
            </Form.Group>
           
            <Button type="submit" size="sm" title="Dodaj" variant="dark">Dodaj</Button>
        </Form>
    )
}
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { updateTicketStatus } from "../store/slices/ticketsSlice";
import {BiSolidSave} from 'react-icons/bi'


export function TicketChangeStatusSelect({ ticket }) {
    const dispatch=useDispatch()
    const [newStatus,setNewStatus]=useState("Nowe")
    const handleStatusChange = (event, item) => {
        if (event || item) {
            const target = event.target ? event.target : item;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name

            setNewStatus({
                ...newStatus,
                [name]: value
            });
        }


    };
    const handleStatusSubmit = (e) => {
        e.preventDefault();
        setNewStatus({...newStatus,ticketId: parseInt(e.target["ticketId"].value)});
        dispatch(updateTicketStatus({...newStatus,ticketId: parseInt(e.target["ticketId"].value)}));
        console.log("handleStatusSubmit");
    }
    return (
        <Form onSubmit={handleStatusSubmit}>
            <Form.Control type="hidden" name="ticketId" value={ticket.id} onChange={handleStatusChange}></Form.Control>
 
            <Button type="submit" size="sm" variant="light" title="Zapisz status"><BiSolidSave /></Button>
        </Form>
    )
}
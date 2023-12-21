import React, { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { statusConfig } from "./EnumsCustom";
import { Alert, Card, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTicketQuery, useUpdateTicketMutation } from '../store/api/mainApi';
import { useGetCategoriesQuery } from '../store/api/categoriesApi';
import { RSelect1, mapDataForSelects, mapDataFromSelectToOpiekun } from "./RSelect1";
import AsyncSelectUsers from "./AsyncSelectUsers";
export function TicketEditForm() {
    const { id: ticketId } = useParams();
    const navigate = useNavigate()
    const [updateTicket] = useUpdateTicketMutation()
    const { data: ticketdata, isSuccess: isSuccessGetTicket, isLoading: isLoadingGetTicket, error: errorTicket, isError: isErrorTicket } = useGetTicketQuery(ticketId);
    const { data: categoriesData, isSuccess: isSuccessGetCategories, isLoading: isLoadingGetCategories } = useGetCategoriesQuery();
    const [newTicket, setNewTicket] = useState()


    const handleInputChange = (e, input) => {
        let value, name, target;
        target = e?.target ? e.target : e;
        if (Array.isArray(e)) {
            name = input
            value = e.map((item) => {
                return {
                    opiekunId: item.value
                }
            })
        }
        else {
            value = target.type === 'checkbox' ? target.checked : target.value;
            name = input ? input : target.name
        }

        setNewTicket({
            ...newTicket,
            [name]: value,
        });
        console.log(newTicket);
    };

    const handleOpiekunwieChange = (e) => {
        setNewTicket(prev => ({ ...prev, opiekunowie: mapDataFromSelectToOpiekun(e, { value: item => item.value, name: item => item.label }) }))
        console.log(newTicket);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
           
            const {id,CategoryId,opiekunowie,status,zglaszajacyId,temat,tresc}=ticketdata
            console.log({id,CategoryId,opiekunowie,status,zglaszajacyId,temat,tresc,...newTicket});
            await updateTicket({id,CategoryId,opiekunowie,status,zglaszajacyId,temat,tresc,...newTicket}).unwrap()
                .then((data) => {
                }).finally((final) => {
                    navigate('/tickets');
                });

        } catch (error) {
            console.error(error);
        }
    }

   
    let content, optionsKategorie, defaultZglaszajacy,defaultOpiekunowie, defaultStatus, defaultCategory, optionsUsers, optionsStatus, selectStatus, selectCategory, selectUser, selectOpiekunowie;
    if (isLoadingGetTicket || isLoadingGetCategories) {
        content = <Spinner />
    } else if (isSuccessGetTicket && isSuccessGetCategories) {
   
        defaultZglaszajacy = ticketdata?.zglaszajacy?.name + " " + ticketdata?.zglaszajacy?.surname + "(" + ticketdata?.zglaszajacy?.login + ")";
        defaultOpiekunowie=mapDataForSelects(ticketdata?.opiekunowie, { value: item => item.id, name: item => item.name + " " + item.surname + "(" + item.login + ")"  })
        defaultStatus = ticketdata?.status
        defaultCategory = ticketdata?.Category?.name
       
        optionsStatus = mapDataForSelects(statusConfig, { value: item => item, name: item => item })
        optionsKategorie = mapDataForSelects(categoriesData, { value: item => item.id, name: item => item.name })
        selectStatus = <RSelect1 onChange={handleInputChange} options={optionsStatus} defaultInputValue={defaultStatus} inputName="status" />;
        selectCategory = <RSelect1 onChange={handleInputChange} options={optionsKategorie} defaultInputValue={defaultCategory} inputName="CategoryId" />;
        selectUser = <RSelect1 onChange={handleInputChange} defaultInputValue={defaultZglaszajacy} options={optionsUsers} inputName="zglaszajacyId" />
        selectOpiekunowie = <RSelect1 defaultValue={defaultOpiekunowie} isMulti={true} onChange={handleOpiekunwieChange} options={optionsUsers} inputName="opiekunowie" />
        content = 
        <Card className="shadow m-2">
            <Card.Header><b>Edytuj zgłoszenie</b></Card.Header>
            <Card.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Kategoria</Form.Label>
                {selectCategory}
                <Form.Label>Temat</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Temat"
                    name="temat"
                    value={newTicket?.temat || ''}
                    onChange={handleInputChange}

                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Zglaszający</Form.Label>
                <AsyncSelectUsers  onChange={handleInputChange} 
                defaultInputValue={defaultZglaszajacy}
                inputName="zglaszajacyId" />
            </Form.Group>
            <Form.Group>
                <Form.Label>opiekunowie</Form.Label>
                <AsyncSelectUsers  onChange={handleOpiekunwieChange} 
                defaultValue={defaultOpiekunowie} isMulti={true}
                inputName="opiekunowie" />
            </Form.Group>
            <Form.Group>
                <Form.Label>status</Form.Label>
                {selectStatus}
            </Form.Group>
            <Form.Group>
                <Form.Label>tresc</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="tresc"
                    name="tresc"
                    value={newTicket?.tresc || ''}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Button title="Zapisz" variant="dark" onClick={(e) => handleSubmit(e)} > Zapisz
            </Button>
        </Form>
        </Card.Body>
        </Card>
    }
    else if (isErrorTicket) {
       content=errorTicket??<Alert>errorTicket</Alert>
    }
    return (
        <>
        {   console.log(ticketdata?.opiekunowie)}
            {content}
        </>

    )
}
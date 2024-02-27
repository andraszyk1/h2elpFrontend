import { useEffect, useState } from "react";
import { Alert, Card, Spinner } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from "react-router-dom";
import { useGetCategoriesQuery } from '../store/api/categoriesApi';
import { useGetTicketQuery, useUpdateTicketMutation } from '../store/api/mainApi';
import { AsyncSelectUsers, statusOpcje } from "./Forms";
import { RSelect1, mapDataForSelects } from "./RSelect1";
export function TicketEditForm() {
    const { id: ticketId } = useParams();
    const navigate = useNavigate()
    const [updateTicket] = useUpdateTicketMutation()
    const { data: ticketdata, isSuccess: isSuccessGetTicket, isLoading: isLoadingGetTicket, error: errorTicket, isError: isErrorTicket } = useGetTicketQuery(ticketId);
    const { data: categoriesData, isSuccess: isSuccessGetCategories, isLoading: isLoadingGetCategories } = useGetCategoriesQuery();
    const [newTicket, setNewTicket] = useState({})

    useEffect(() => {
        if (isSuccessGetTicket) {
            const actualOpiekunowie = ticketdata?.opiekunowie.map(item => item.login)
            setNewTicket({ id: ticketdata?.id, CategoryId: ticketdata?.CategoryId, opiekunowie: actualOpiekunowie, status: ticketdata?.status, zglaszajacyId: ticketdata?.zglaszajacyId, temat: ticketdata?.temat, tresc: ticketdata?.tresc })
        }
    }, [isSuccessGetTicket])
    const handleInputChange = (e, input) => {


        let value, name, target;
        target = e?.target ? e.target : e;
        value = target.type === 'checkbox' ? target.checked : target.value;
        name = input ? input : target.name
        if (Array.isArray(e) && input === 'opiekunowie') {
            value = e.map(opiekun => opiekun.value)
        };

        setNewTicket({ ...newTicket, [name]: value });

    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(newTicket);
            await updateTicket(newTicket).unwrap()
            navigate('/tickets');
        } catch (error) {
            console.error(error);
        }
    }


    let content, optionsKategorie, defaultZglaszajacy, defaultOpiekunowie, defaultStatus, defaultCategory, optionsUsers, optionsStatus, selectStatus, selectCategory, selectUser, selectOpiekunowie;
    if (isLoadingGetTicket || isLoadingGetCategories) {
        content = <Spinner />
    } else if (isSuccessGetTicket && isSuccessGetCategories) {

        defaultZglaszajacy = ticketdata?.zglaszajacy?.name + " " + ticketdata?.zglaszajacy?.surname + "(" + ticketdata?.zglaszajacy?.login + ")";
        defaultOpiekunowie = mapDataForSelects(ticketdata?.opiekunowie, { value: item => item.login, name: item => item.name + " " + item.surname + "(" + item.login + ")" })
        defaultStatus = ticketdata?.status
        defaultCategory = ticketdata?.Category?.name
        optionsKategorie = mapDataForSelects(categoriesData, { value: item => item.id, name: item => item.name })
        selectCategory = <RSelect1 onChange={handleInputChange} options={optionsKategorie} defaultInputValue={defaultCategory} inputName="CategoryId" />;
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
                            <AsyncSelectUsers onChange={handleInputChange}
                                defaultInputValue={defaultZglaszajacy}
                                inputName="zglaszajacyId" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>opiekunowie</Form.Label>
                            <AsyncSelectUsers onChange={handleInputChange}
                                defaultValue={defaultOpiekunowie} isMulti={true}
                                inputName="opiekunowie" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>status</Form.Label>
                            <RSelect1 onChange={handleInputChange} options={statusOpcje} defaultInputValue={defaultStatus} inputName="status" />
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
        content = errorTicket ?? <Alert>errorTicket</Alert>
    }
    return (
        <>

            {content}
        </>

    )
}
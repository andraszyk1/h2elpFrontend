import React, { useState } from "react"
import { useAddTicketMutation } from '../store/api/mainApi';
import { useGetCategoriesQuery } from '../store/api/categoriesApi';
import { Alert, Spinner, Form, Button, Row, Col, Card } from "react-bootstrap";
import { RSelect1, mapDataForSelects } from "./RSelect1";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AsyncSelectUsers from "./AsyncSelectUsers";
export const TicketAddForm = () => {
    const account = useSelector(state => state.auth.loggedUser);
    const [inputValue] = useState('');
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [file, setFile] = useState(null)
    const [addTicket, { isLoading: isLoadingAddTicket }] = useAddTicketMutation();
    const { data: kategorieData, isSuccess: isSuccessCategories, isError: isErrorCategories, isLoading: isLoadingCategories } = useGetCategoriesQuery();
    const [newTicket, setNewTicket] = useState({
        CategoryId: "", tworcaId: account.login, zglaszajacyId: "", temat: "", opiekunowie: [], tresc: ""
    })



    const handleInputChange = (e, input) => {

    let value, name, target;
    target = e.target ? e.target : e;
    if (Array.isArray(e)&&input==='opiekunowie') {
        name = input
        value = e.map(item => item.value)
    }
    else {
        value = target.type === 'checkbox' ? target.checked : target.value;
        name = input ? input : target.name
    }

    setNewTicket({
        ...newTicket,
        [name]: value,
    });
    };

    let canSave = Object.values(newTicket).every((x) => x ?? '')
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        try {
            if (validated && canSave) {
                const data = new FormData();
                data.append("CategoryId", newTicket.CategoryId)
                data.append("tworcaId", newTicket.tworcaId)
                data.append("zglaszajacyId", newTicket.zglaszajacyId)
                data.append("temat", newTicket.temat)
                data.append("opiekunowie", JSON.stringify(newTicket.opiekunowie))
                data.append("tresc", newTicket.tresc)
                data.append('file', file);
           
                await addTicket(data).unwrap();
                navigate("/tickets")
            }

        } catch (error) {
            console.error(error);
        }
    }
 
    let content, optionsKategorie, selectCategory;
    if (isSuccessCategories) {
        optionsKategorie = mapDataForSelects(kategorieData, { value: item => item.id, name: item => item.name })
        selectCategory = <RSelect1 onChange={handleInputChange} options={optionsKategorie} inputName="CategoryId" />;

        content =
            <>
                <Card className="shadow m-2">
                    <Card.Header><b>Dodaj zgłoszenie</b></Card.Header>
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={handleSubmit} method="POST" encType='multipart/form-data'>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationCustom01">
                                    <Form.Label>Kategoria</Form.Label>
                                    {selectCategory}
                                </Form.Group>
                           
                                <Form.Group as={Col} md="4" controlId="validationCustom02">
                                    <Form.Label>Zgłaszający</Form.Label>
                                    <AsyncSelectUsers onChange={handleInputChange} inputName="zglaszajacyId" />
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                    <Form.Label>Wybierz opiekuna</Form.Label>

                                    <AsyncSelectUsers isMulti={true}  onChange={handleInputChange} inputName="opiekunowie" />

                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom03">
                                    <Form.Label>Temat</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Temat"
                                        name="temat"
                                        onChange={handleInputChange}

                                    />

                                    <Form.Control.Feedback type="invalid">
                                        Wpisz temat
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustom04">
                                    <Form.Label>Treść</Form.Label>
                                    <Form.Control required
                                        as="textarea"
                                        style={{ height: '100px' }}
                                        placeholder="Podaj treść zgłoszenia"
                                        name="tresc"
                                        onChange={handleInputChange} />
                                    <Form.Control.Feedback type="invalid">
                                        Wpisz treść
                                    </Form.Control.Feedback>

                                </Form.Group>
                            </Row>
                            <Form.Group controlId="fileName" className="mb-3">
                                <Form.Label>Dodaj plik</Form.Label>
                                <Form.Control
                                    type="file"
                                    name='image'
                                    onChange={(e) => setFile(e.target.files[0])}
                                    size="sm" />
                            </Form.Group>
                            <Button type="submit" size="sm" title="Dodaj" variant="dark" onClick={handleSubmit} >
                                {isLoadingAddTicket ? <Spinner /> : "Zapisz"}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </>
    } else if (isLoadingCategories) {
        content = <Spinner />
    }
    else if (isErrorCategories) {
        content = <Alert>Problem z pobraniem kategori lub uzytkownika</Alert>
    }



    return (
        <>
            {content}
        </>

    )
}
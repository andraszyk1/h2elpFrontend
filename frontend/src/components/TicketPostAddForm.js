import React, { useState } from "react"
import { useAddPostMutation } from '../store/api/postsApi';
import { Alert, Spinner, Form, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
export const TicketPostAddForm = () => {
    const account = useSelector(state => state.auth.loggedUser);
    const navigate = useNavigate()
    const { id } = useParams()
    const [addPost, { isLoading: isLoadingAddPost }] = useAddPostMutation();
    const [newPost, setNewPost] = useState({
        login: account.login, ticketId: id, content: ""
    })
    const [validated, setValidated] = useState(false);


    const handleInputChange = (e, input) => {
        let value, name, target;
        target = e.target ? e.target : e;
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
        setNewPost({
            ...newPost,
            [name]: value,
        });
    };


    let canSave = Object.values(newPost).every((x) => x ?? '')
    console.log(newPost);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);
        try {
            if (validated && canSave) {
                await addPost(newPost);
                setNewPost({
                    login: account.login, ticketId: id, content: ""
                })
            }

        } catch (error) {
            console.error(error);
        }
    }

    let content

    content =
        <>
            <Card className="shadow" style={{ padding: 0 }}>
                <Card.Header><b>Dodaj komentarz</b></Card.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Col>
                        <Row className="mb-1 p-1">
                            <Form.Group as={Col} controlId="validationCustom04">
                                <Form.Control required value={newPost?.content}
                                    as="textarea"
                                    style={{ height: '50px' }}
                                    placeholder="Treść komentarza"
                                    name="content"
                                    onChange={handleInputChange} />
                                <Form.Control.Feedback type="invalid">
                                    Wpisz treść
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col className="m-1">
                            <Button type="submit" size="sm" title="Dodaj" variant="dark" onClick={handleSubmit} >
                                {isLoadingAddPost ? <Spinner /> : "Dodaj"}
                            </Button>
                            </Col>
                        </Row>
                    </Col>
                </Form>
            </Card>
        </>
    return (
        <>
            {content}
        </>

    )
}
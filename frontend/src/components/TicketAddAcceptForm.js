import React, { useState } from "react"
import { Alert, Spinner, Form, Button, Stack,Card } from "react-bootstrap";
import { RSelect1, mapDataForSelects } from "./RSelect1";

import { useSelector } from 'react-redux';
import { mainApi } from "../store/api/mainApi";
export const TicketAddAcceptForm = () => {
    const account = useSelector(state => state.auth.loggedUser);
    const emptyArray = [];
    const [newAccepUser, setNewAcceptUser] = useState({})
    const [validated, setValidated] = useState(false);
    const users = mainApi.useGetUsersQuery(undefined, {
        selectFromResult: ({ data }) => ({
            users: data ?? emptyArray
        })
    })

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
        setNewAcceptUser({
            ...newTicket,
            [name]: value,
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {

            event.stopPropagation();
        }
        setValidated(true);
        try {
            if (validated) {
                await addAccept({ AcceptUserId, AcceptTicketId, status: "Do Zaakceptowania" }).unwrap();

            }

        } catch (error) {
            console.error(error);
        }
    }
    let content, optionsUsers, selectUser;
    if (isSuccessUsers) {
        optionsUsers = mapDataForSelects(usersData, { value: item => item.login, name: item => item.name + " " + item.surname })
        selectUser = isLoadingUsers ? <Spinner /> : <RSelect1 isLoading={isLoadingUsers} onChange={handleInputChange} options={optionsUsers} inputName="zglaszajacyId" />
        content = 
        <Card><Form validated={validated} onSubmit={handleSubmit}>
                <Stack direction="horizontal" gap={2}>
                <Row>
                {selectUser}
                </Row>
                <Row>
                    <Button type="submit" size="sm" title="Dodaj" variant="dark" onClick={handleSubmit} >
                        {isLoadingAddTicket ? <Spinner /> : "Zapisz"}
                    </Button>
                    </Row>
                    </Stack>
        </Form>
        </Card>
    } else if (isLoadingUsers) {
        selectCategory = <Spinner />
        selectUser = <Spinner />
    }
    else if (isErrorCategories || isErrorUsers) {
        content = <Alert>Problem z pobraniem kategori lub uzytkownika</Alert>
    }
    return (
        <>
            {content}
        </>

    )
}
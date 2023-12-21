import React, { useState } from "react"
import { Badge, Button, Col, Form, Stack, Spinner, Card, Toast, ToastContainer, Row } from "react-bootstrap";
import { useAddAcceptTicketMutation,useUpdateTicketStatusMutation } from "../store/api/mainApi";
import { useGetUsersQuery } from "../store/api/usersApi";
import RSelect1, { mapDataForSelects } from "./RSelect1";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";



export const TicketAddAccept = () => {
    const account = useSelector(state => state.auth.loggedUser);
    const { id } = useParams()
    const [showToast, setShowToast] = useState(false);
    const [messageToast, setMessageToast] = useState('');
    const navigate = useNavigate()
    const [userAcceptId, setUserAcceptId] = useState("")
    const [ticketAcceptId] = useState(id)
    const [addAccept] = useAddAcceptTicketMutation()
    const [updateTicketStatus] = useUpdateTicketStatusMutation();
    const { data: users, isLoading: isLoadingGetUsers, isSuccess: isSuccessGetUsers } = useGetUsersQuery()


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log(userAcceptId, ticketAcceptId);
        try {
            const response = await addAccept({ status: "Do Akceptacji", userAcceptId, ticketAcceptId }).unwrap()
            await updateTicketStatus({ id:ticketAcceptId, status:"Wstrzymane"}).unwrap()
            console.log(response);
            const { success, message } = response;
            if (success) {
                navigate(`/tickets/${id}`)
            } else {
                setShowToast(true)
                setMessageToast(message)
            }

        } catch (error) {
            console.log(error);
        }
    }
    let content, toast
    if (isLoadingGetUsers) {
        content = <Spinner />
    } else if (isSuccessGetUsers) {
        let optionsUsers, selectUser;
        optionsUsers = mapDataForSelects(users, { value: item => item.login, name: item => item.name + " " + item.surname + "(" + item.login + ")" })
        selectUser = <RSelect1 options={optionsUsers} onChange={(e) => setUserAcceptId(e.value)} />


        toast = 
        <ToastContainer position="top-center">
        <Toast  onClose={() => setShowToast(false)} show={showToast} delay={4000} autohide>
            <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                />
                <strong className="me-auto">Komunikat</strong>
            </Toast.Header>
            <Toast.Body>{messageToast}</Toast.Body>
        </Toast>
        </ToastContainer>
        content = <>
          
                <Form onSubmit={handleOnSubmit}>
                   <Row>
                        <Col sm={6} md={6} lg={6} xs={6} xl={6} xxl={6}  >
                            {selectUser}
                        </Col>
                        <Col sm={6} md={6} lg={6} xs={6} xl={6} xxl={6}  >
                            <Button  className="col-12"   variant="dark" type="submit">Dodaj Akceptację</Button>
                            </Col>
                        </Row>
                </Form>
       

        </>
    } else {
        console.log("error");
    }


    return (
        <>
            {showToast && toast}
            {content}
        </>

    )
}
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useAddAcceptTicketMutation, useUpdateTicketStatusMutation } from "../store/api/mainApi";
import { setShowToast } from "../store/slices/toastSlice";
import AsyncSelectUsers from "./AsyncSelectUsers";

export const TicketAddAccept = () => {
    const { id: ticketAcceptId } = useParams();
    const [userAcceptId, setUserAcceptId] = useState("");
    const [addAccept] = useAddAcceptTicketMutation();
    const [updateTicketStatus] = useUpdateTicketStatusMutation();
    const dispatch=useDispatch();
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addAccept({ status: "Do Akceptacji", userAcceptId, ticketAcceptId }).unwrap()
            await updateTicketStatus({ id: [ticketAcceptId], status: "Wstrzymane" }).unwrap()
            const {message } = response;
            dispatch(setShowToast({showToast:true,message:message,variant:'danger'}));
        
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form onSubmit={handleOnSubmit}>
        <Row>
            <Col sm={6} md={6} lg={6} xs={6} xl={6} xxl={6}  >
                <AsyncSelectUsers onChange={(e) => setUserAcceptId(e.value)} valueToInput={userAcceptId} />
            </Col>
            <Col sm={6} md={6} lg={6} xs={6} xl={6} xxl={6}  >
                <Button className="col-12" size="sm" variant="dark" type="submit">Dodaj Akceptację</Button>
            </Col>
        </Row>
    </Form>
    )
}
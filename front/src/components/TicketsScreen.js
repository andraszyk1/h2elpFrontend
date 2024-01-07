import { Row, Col, Button, Spinner, Navbar, Alert, Container, Form } from 'react-bootstrap'

import React, { useState } from "react"
import { IoAddOutline } from 'react-icons/io5'
import { TicketSearch } from './TicketSearch'
import { TicketFilters } from './TicketFilters'
import TicketDeleteBtn from './TicketDeleteBtn'
import TicketEditBtn from './TicketEditBtn'
import TicketShowBtn from './TicketShowBtn'
import TableCustom from './TableCustom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCheckedTickets, setAllCheckedTickets, selectCheckedTickets, selectFilters, selectSerch } from '../store/slices/ticketsSlice'
import { TimeAgo } from './TimeAgo'
import TicketChangeStatusToCloseBtn from './TicketChangeStatusToCloseBtn'
import { useGetTicketsQuery } from '../store/api/mainApi'

export default function TicketsScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const checkedTickets = useSelector(selectCheckedTickets)
    const filters = useSelector(selectFilters)
    const search = useSelector(selectSerch)
    const [ticketsLimit, setTicketsLimit] = useState(5)
    const { data, isSuccess, isLoading } = useGetTicketsQuery(
        {
            search: search ?? "",
            status: filters.status ?? "",
            category: filters.category ?? "",
            limit: ticketsLimit ?? 5,

        })

    const handleInsertTicket = () => {
        navigate('/tickets/add')
    }
    const handleClickCheckTicket = (id) => {
        dispatch(setCheckedTickets(id))
    }
    const handleClickCheckTicketAll = (e) => {
        if (e.target.checked)
            dispatch(setAllCheckedTickets(data?.map(ticket => ticket.id)))
        else {
            dispatch(setAllCheckedTickets([]))
        }
    }

    const columns = [
        { colName: <Form name='formCheckAll'><Form.Check id='checkAll' name='checkAll' onChange={(e) => handleClickCheckTicketAll(e)} /></Form>, colValue: item => <><Form.Check id={"check-" + item.id} name={"check-" + item.id} value={item.id} checked={checkedTickets.indexOf(item.id) !== -1 ? true : false} onChange={() => handleClickCheckTicket(item.id)} /></> },
        { colName: "Kategoria", colValue: item => item?.Category?.name, sort: true, valueToSort: item => item?.Category?.name },
        { colName: "Status", colValue: item => item?.status, sort: true, valueToSort: item => item?.status },
        { colName: "Twórca", colValue: item => item?.tworca?.name + " " + item?.tworca?.surname, sort: true, valueToSort: item => item?.tworca?.name },
        { colName: "Temat", colValue: item => item?.temat, sort: true, valueToSort: item => item?.temat },
        { colName: "Utworzono", colValue: item => <TimeAgo timestamp={item?.createdAt} />, sort: true, valueToSort: item => item?.createdAt },
        { colName: "Zaktualizowano", colValue: item => <TimeAgo timestamp={item?.updatedAt} />, sort: true, valueToSort: item => item?.updatedAt },
        {
            colName: "Akcje", colValue: item => <>
                <TicketShowBtn ticketId={item.id} /> <TicketEditBtn ticketId={item.id} />   <TicketDeleteBtn ticketId={item.id} />
            </>
        },
    ]

    let content
    if (isLoading) content= <Spinner />
    else if (isSuccess) content = <TableCustom data={data} columns={columns} />
    else content = <Alert>"brak zgłoszeń"</Alert>
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#">
                        <Button variant='dark' title='Dodaj zgłoszenie' size='sm' onClick={handleInsertTicket}> <IoAddOutline /> Dodaj Zgłoszenie </Button>
                        {checkedTickets?.length > 0 && <TicketChangeStatusToCloseBtn ticketIds={checkedTickets}> Zamknij {checkedTickets?.length - 1} zgłoszeń  </TicketChangeStatusToCloseBtn>}
                    </Navbar.Brand>
                    <TicketSearch />
                </Container>
            </Navbar>
            <Navbar className="bg-body-tertiary">
                <Col className='fluid'>
                    <TicketFilters />
                </Col>
            </Navbar>
            <Row>
                <Col>
                    {content}
                </Col>

            </Row>
            <Row>
                <Col>
                    <Form.Select onChange={(e) => setTicketsLimit(e.target.value)}>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                    </Form.Select>
                </Col>

            </Row>
        </>
    )
}
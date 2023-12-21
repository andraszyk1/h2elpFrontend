import { Row, Col, Button, Spinner, Alert, Navbar, Container, Form } from 'react-bootstrap'
import { Ticket } from './Ticket'
import React, { useEffect, useState } from "react"
import { IoAddOutline } from 'react-icons/io5'
import { TicketSearch } from './TicketSearch'
import { TicketFilters } from './TicketFilters'
import TicketDeleteBtn from './TicketDeleteBtn'
import TicketEditBtn from './TicketEditBtn'
import TicketShowBtn from './TicketShowBtn'
import TableCustom from './TableCustom'
import { useGetTicketsQuery } from '../store/api/mainApi'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilteredTickets, setTicketsToFilter,setCheckedTickets,selectCheckedTickets } from '../store/slices/ticketsSlice'
import { TimeAgo } from './TimeAgo'
import TicketChangeStatusToCloseBtn from './TicketChangeStatusToCloseBtn'

export default function TicketsScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
   
    const filteredTicketsData = useSelector(selectFilteredTickets)
    const checkedTickets = useSelector(selectCheckedTickets)
    const { data: dataTickets, isSuccess, isFetching, isError, error } = useGetTicketsQuery()
    
    const handleInsertTicket =()=>{
        navigate('/tickets/add')
    }
    const handleClickCheckTickt = (id) => {
        dispatch(setCheckedTickets(id))
    }

    useEffect(() => {
        if (isSuccess)
            dispatch(setTicketsToFilter(dataTickets))
    }, [dispatch, dataTickets, isSuccess])
    const columns = [
        { colName: "Check", colValue: item => <><Form.Check value={item.id} checked={checkedTickets.indexOf(item.id)!==-1 ? true : false}  onChange={() => handleClickCheckTickt(item.id)} /></> },
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
    let content, tablecustom

    if (isFetching) {
        content = <Spinner text="Loading..." />
    } else if (isSuccess) {
        content = filteredTicketsData.map(ticket => (
            <Ticket key={ticket.id} ticket={ticket} />
        ))
        tablecustom = <TableCustom data={filteredTicketsData} columns={columns} />
    } else if (isError) {
        content = <Alert variant='success'>Brak Danych {error}</Alert>
    }
    return (
        <>

            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#">
                        <Button variant='dark' title='Dodaj zgłoszenie' size='md' onClick={handleInsertTicket}> <IoAddOutline /> Dodaj Zgłoszenie </Button>

                        {checkedTickets?.length > 0 && <TicketChangeStatusToCloseBtn ticketIds={checkedTickets}> Zamknij {checkedTickets?.length} zgłoszeń  </TicketChangeStatusToCloseBtn>}
                    
                    </Navbar.Brand>
                    <TicketSearch />
                </Container>
            </Navbar>
            <Navbar className="bg-body-tertiary">
                <Col className='fluid'>
                    <TicketFilters filtersFromDashboard={params?.filter ? JSON.parse(params?.filter) : {}} />
                </Col>
            </Navbar>
            <Row>


                <Col>
                    {tablecustom}
                    {/* {content} */}
                </Col>

            </Row>
        </>
    )
}
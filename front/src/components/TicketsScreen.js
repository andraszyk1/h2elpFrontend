
import { Alert, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useGetTicketsQuery } from '../store/api/mainApi'
import { selectCheckedTickets, selectDisableInputCheck, selectFilters, selectSerch, setAllCheckedTickets, setButtonAllTicketsChecked, setCheckedTickets } from '../store/slices/ticketsSlice'
import TicketsFilterForm from './Forms/TicketsFilterForm'
import TableCustom from './TableCustom'
import TicketDeleteBtn from './TicketDeleteBtn'
import TicketEditBtn from './TicketEditBtn'
import { TicketSearch } from './TicketSearch'
import TicketShowBtn from './TicketShowBtn'
import TicketsPanelActions from './TicketsPanelActions'
import { TimeAgo } from './TimeAgo'

export default function TicketsScreen() {
    const dispatch = useDispatch()
    const checkedTickets = useSelector(selectCheckedTickets)
    const disableCheckedAll = useSelector(selectDisableInputCheck)
    const filters = useSelector(selectFilters)
    const search = useSelector(selectSerch)


    const { data, isSuccess, isLoading } = useGetTicketsQuery(
        {
            search: search ?? "",
            status: filters.status ?? "",
            category: filters.category ?? "",
            tworca: filters.tworca ?? "",
            temat: filters.temat ?? "",
            limit: 10,

        })


    const handleClickCheckTicket = (id) => {
        dispatch(setCheckedTickets(id))
    }
    const handleClickCheckTicketAll = (e) => {
        if (e.target.checked === true) {
            dispatch(setButtonAllTicketsChecked(true));
            dispatch(setAllCheckedTickets(data?.map(ticket => ticket.id)))
        }
        else {
            dispatch(setButtonAllTicketsChecked(false));
            dispatch(setAllCheckedTickets([]))
        }
    }

    const columns = [
        { colName: <Form name='formCheckAll'><Form.Check id='checkAll' name='checkAll' onChange={handleClickCheckTicketAll} disabled={Array(checkedTickets).length === 0} checked={disableCheckedAll} /></Form>, colValue: item => <><Form.Check value={item.id} checked={checkedTickets.indexOf(item.id) !== -1 ? true : false} onChange={() => handleClickCheckTicket(item.id)} /></> },
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
    if (isLoading) content = <Spinner />
    else if (isSuccess) content = <TableCustom data={data} columns={columns} />
    else content = <Alert>"Brak dodanych zgłoszeń"</Alert>
    return (
        <>
            <Row>
                <Col className='fluid'>
                    <TicketsPanelActions />
                </Col>
            </Row>
            <Row >

                <Col className='fluid'>
                    <Container className='border p-4'>
                        <Row>
                            <Col className='col-9'>

                                <TicketsFilterForm />
                            </Col>
                            <Col className='col-3'>
                                <TicketSearch />
                            </Col >
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col className='fluid'>
                    {content}
                </Col>
            </Row>

        </>
    )
}

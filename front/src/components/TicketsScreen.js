
import { TimeAgo } from './TimeAgo'
import { TicketFilters } from './TicketFilters'
import TicketDeleteBtn from './TicketDeleteBtn'
import TicketEditBtn from './TicketEditBtn'
import TicketShowBtn from './TicketShowBtn'
import TableCustom from './TableCustom'
import TicketsPanelActions from './TicketsPanelActions'
import { Row, Col, Spinner, Alert, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setCheckedTickets, setAllCheckedTickets, selectCheckedTickets, selectFilters, selectSerch } from '../store/slices/ticketsSlice'
import { useGetTicketsQuery } from '../store/api/mainApi'
import TicketsFilterForm from './Forms/TicketsFilterForm'

export default function TicketsScreen() {
    const dispatch = useDispatch()
    const checkedTickets = useSelector(selectCheckedTickets)
    const filters = useSelector(selectFilters)
    const search = useSelector(selectSerch)
  
    console.log(filters);
    const { data, isSuccess, isLoading } = useGetTicketsQuery(
        {
            search: search ?? "",
            status: filters.status ?? "",
            category: filters.category ?? "",
            tworca:filters.tworca ?? "",
            limit: 10,

        })
console.log(data)

    const handleClickCheckTicket = (id) => {
        dispatch(setCheckedTickets(id))
    }
    const handleClickCheckTicketAll = (e) => {
        if(data?.length===0) return;
        if (e?.target?.checked)
            dispatch(setAllCheckedTickets(data?.map(ticket => ticket.id)))
        else {
            dispatch(setAllCheckedTickets([]))
        }
    }

    const columns = [
        { colName: <Form name='formCheckAll'><Form.Check id='checkAll' name='checkAll' onChange={(e) => handleClickCheckTicketAll(e)} disabled={data?.length===0?true:false} /></Form>, colValue: item => <><Form.Check id={"check-" + item.id} name={"check-" + item.id} value={item.id} checked={checkedTickets.indexOf(item.id) !== -1 ? true : false} onChange={() => handleClickCheckTicket(item.id)} /></> },
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
            <Row>
                <Col className='fluid'>
                    <TicketsFilterForm/>
                    {/* <TicketFilters /> */}
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

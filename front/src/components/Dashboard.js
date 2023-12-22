import React, { useEffect, useState ,useRef} from 'react'
import { Container, Row, Col, Card, Button, Spinner, Badge, Table } from 'react-bootstrap';
import { useGetTicketsByTworcaIdQuery, useGetTicketsCountWithStatusQuery  } from '../store/api/mainApi'
import { useDispatch, useSelector } from 'react-redux';
import { TimeAgo } from './TimeAgo';

import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdArrowForward } from 'react-icons/md'
import { setFiltersToTickets } from '../store/slices/ticketsSlice';
function Dashboard() {
  const [page, setPage] =useState(1)
  const navigate = useNavigate();
  const dispatch=useDispatch()
const refCard1=useRef(null)
  const refCard2=useRef(null)
  const refCard3=useRef(null)
  const account = useSelector(state => state.auth.loggedUser)
  const [counterTicketsUser, setCounterTicketsUser] = useState(0)
  const [counterTicketsNew, setCounterTicketsNew] = useState(0)
  const [counterTicketsClosed, setCounterTicketsClosed] = useState(0)
const [counterTicketsInRealisation, setCounterTicketsInRealisation] = useState(0)
  const { data: dataTicketsUser, isLoading: isLoadingGetTicketsByTworcaId, isSuccess: isSuccessGetTicketsByTworcaId } = useGetTicketsByTworcaIdQuery({id:account.login,page:page})
  const { data: dataTicketsNew, isLoading: isLoadingDataTicketsNew, isSuccess: isSuccessDataTicketsNew } = useGetTicketsCountWithStatusQuery({ status: "Nowe" })
  const { data: dataTicketsClosed, isLoading: isLoadingDataTicketsClosed, isSuccess: isSuccessDataTicketsClosed } = useGetTicketsCountWithStatusQuery({ status: "Zamknięte" })
  const { data: dataTicketsInRealization, isLoading: isLoadingDataTicketsInRealizations, isSuccess: isSuccessDataTicketsInRealizations } = useGetTicketsCountWithStatusQuery({ status: "W realizacji" })

useEffect(() => {
    if (counterTicketsUser < dataTicketsUser?.count) {
      const interval = setInterval(
        ()=>{setCounterTicketsUser(prev => prev + 1)}
        , 100)
      return () => clearInterval(interval)
    }
}
, [isSuccessGetTicketsByTworcaId, counterTicketsUser])
  useEffect(() => {
    if (counterTicketsInRealisation < dataTicketsInRealization?.count) {
      const interval = setInterval(
        ()=>{setCounterTicketsInRealisation(prev => prev + 1)}
        , 100)
      return () => clearInterval(interval)
    }
}
, [isSuccessDataTicketsInRealizations, counterTicketsInRealisation])
  useEffect(() => {
      if (counterTicketsNew < dataTicketsNew?.count) {
        const interval = setInterval(
          ()=>{setCounterTicketsNew(prev => prev + 1)}
          , 100)
        return () => clearInterval(interval)
      }
  }
  , [isSuccessDataTicketsNew, counterTicketsNew])
  useEffect(() => {
    if (counterTicketsClosed < dataTicketsClosed?.count) {
      const interval = setInterval(
        ()=>{setCounterTicketsClosed(prev => prev + 1)}
        , 50)
      return () => clearInterval(interval)
    }
}
, [isLoadingDataTicketsClosed, counterTicketsClosed])

const handleonMouseEnterCard1=()=>{
  refCard1.current.style.cursor='pointer'
  refCard1.current.style.backgroundColor='lightblue'
}
const handleonMouseLeaveCard1=()=>{
  refCard1.current.style.cursor='default'
  refCard1.current.style.backgroundColor=''

}
const handleonMouseEnterCard2=()=>{
  refCard2.current.style.cursor='pointer'
  refCard2.current.style.backgroundColor='lightblue'
}
const handleonMouseLeaveCard2=()=>{
  refCard2.current.style.cursor='default'
  refCard2.current.style.backgroundColor=''

}
const handleonMouseEnterCard3=()=>{
  refCard3.current.style.cursor='pointer'
  refCard3.current.style.backgroundColor='lightblue'
}
const handleonMouseLeaveCard3=()=>{
  refCard3.current.style.cursor='default'
  refCard3.current.style.backgroundColor=''

}
const handleOnClick=(status)=>{
  dispatch(setFiltersToTickets({status:status,category:""}))

navigate(`/tickets/`)
}


  let content
  if (isLoadingGetTicketsByTworcaId || isLoadingDataTicketsNew || isLoadingDataTicketsClosed || isLoadingDataTicketsInRealizations) {
    content = <Spinner />
  }
  else if (isSuccessGetTicketsByTworcaId && isSuccessDataTicketsNew && isSuccessDataTicketsClosed && isSuccessDataTicketsInRealizations) {
    content =
      <Container fluid className='m-4' >
        <Row>
          <Col lg={6}>
            <Card className='shadow m-2'>
              <Card.Header>
              <Row>
            <Col sm={6} md={6} lg={6} xs={6} xl={6} xxl={6}>
              <b>Moje zgloszenia:</b> {`${page} / ${dataTicketsUser?.totalPages}`}
            </Col>

            <Col sm={6} md={6} lg={6} xs={6} xl={6} xxl={6} style={{ textAlign: "right" }}>
              <MdArrowBack style={{ cursor: 'pointer', width: "1.5rem", height: "1.5rem" }}
                onClick={() => setPage((prev) => page === 1 ? prev : prev - 1)}

              />
              <MdArrowForward style={{ cursor: 'pointer', width: "1.5rem", height: "1.5rem" }}
                onClick={() => setPage((prev) => page === dataTicketsUser?.totalPages ? prev : prev + 1)}
              />

            </Col>
          </Row>
              </Card.Header>
              <Card.Body>
              
                <Table striped>
                  <thead>
                    <tr>
                      <th>Temat</th>
                      <th>Status</th>
                      <th>Data utworzenia</th>
                      <th>Szczegóły</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataTicketsUser?.rows.map((ticketUser, i) => {
                      return (
                        <tr key={i}>
                          <td>{ticketUser.temat}</td>
                          <td><Badge pill bg='danger'>{ticketUser.status}</Badge></td>
                          <td><TimeAgo timestamp={ticketUser.createdAt} /></td>
                          <td><Button bg="secondary" size="sm" variant="light" onClick={() => { navigate(`/tickets/${ticketUser.id}`) }}>Szczegóły</Button> </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card id='card-1'onClick={()=>handleOnClick("Nowe")} ref={refCard1} className='shadow m-2'  onMouseEnter={handleonMouseEnterCard1} onMouseLeave={handleonMouseLeaveCard1}>
              <Card.Body>
              <div className="d-flex justify-content justify-content-between">
              <h5>Wszystkie nowe zgłoszenia </h5>
              <h1><Badge pill={true} bg='dark'> {counterTicketsNew}</Badge>  </h1>
             </div>
              </Card.Body>
            </Card>
            <Card id='card-2' onClick={()=>handleOnClick("Zamknięte")} ref={refCard2}  className='shadow m-2'  onMouseEnter={handleonMouseEnterCard2} onMouseLeave={handleonMouseLeaveCard2}>
              <Card.Body>
              <div className="d-flex justify-content justify-content-between">
              <h5>Wszystkie zamknięte zgłoszenia </h5>
              <h1><Badge pill={true} bg='dark'> {counterTicketsClosed}</Badge>  </h1>
             </div>
              </Card.Body>
            </Card>
<Card id='card-3' onClick={()=>handleOnClick("W realizacji")} ref={refCard3} className='shadow m-2' onMouseEnter={handleonMouseEnterCard3} onMouseLeave={handleonMouseLeaveCard3}>
              <Card.Body>
              <div className="d-flex justify-content justify-content-between">
              <h5>Wszystkie zgłoszenia w realizacji </h5>
              <h1><Badge pill={true} bg='dark'> {counterTicketsInRealisation}</Badge>  </h1>
             </div>
              </Card.Body>
            </Card>
          </Col>
         
       
        </Row>
      </Container>
  }
  return (

    <>
      
      {content}

    </>

  )
}


export default Dashboard
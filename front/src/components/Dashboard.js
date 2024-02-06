import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Spinner, Badge, Table } from 'react-bootstrap';
import { useGetTicketsByTworcaIdQuery, useGetTicketsCountWithStatusQuery } from '../store/api/mainApi'
import { useDispatch, useSelector } from 'react-redux';
import { TimeAgo } from './TimeAgo';

import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdArrowForward } from 'react-icons/md'
import { setFiltersToTickets } from '../store/slices/ticketsSlice';
function Dashboard() {
  const [page, setPage] = useState(1)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const account = useSelector(state => state.auth.loggedUser)
  const [counterTicketsUser, setCounterTicketsUser] = useState(0)
  const [counterTicketsNew, setCounterTicketsNew] = useState(0)
  const [counterTicketsClosed, setCounterTicketsClosed] = useState(0)
  const [counterTicketsInRealisation, setCounterTicketsInRealisation] = useState(0)
  const { data: dataTicketsUser, isLoading: isLoadingGetTicketsByTworcaId, isSuccess: isSuccessGetTicketsByTworcaId } = useGetTicketsByTworcaIdQuery({ id: account.login, page: page })
  const { data: dataTicketsNew, isLoading: isLoadingDataTicketsNew, isSuccess: isSuccessDataTicketsNew } = useGetTicketsCountWithStatusQuery({ status: "Nowe" })
  const { data: dataTicketsClosed, isLoading: isLoadingDataTicketsClosed, isSuccess: isSuccessDataTicketsClosed } = useGetTicketsCountWithStatusQuery({ status: "Zamknięte" })
  const { data: dataTicketsInRealization, isLoading: isLoadingDataTicketsInRealizations, isSuccess: isSuccessDataTicketsInRealizations } = useGetTicketsCountWithStatusQuery({ status: "W realizacji" })

  useEffect(() => {
    if (counterTicketsUser < dataTicketsUser?.count) {
      const interval = setInterval(
        () => { setCounterTicketsUser(prev => prev + 1) }
        , 100)
      return () => clearInterval(interval)
    }
  }
    , [isSuccessGetTicketsByTworcaId, counterTicketsUser, dataTicketsUser?.count])
  useEffect(() => {
    if (counterTicketsInRealisation < dataTicketsInRealization?.count) {
      const interval = setInterval(
        () => { setCounterTicketsInRealisation(prev => prev + 1) }
        , 100)
      return () => clearInterval(interval)
    }
  }
    , [isSuccessDataTicketsInRealizations, counterTicketsInRealisation, dataTicketsInRealization?.count])
  useEffect(() => {
    if (counterTicketsNew < dataTicketsNew?.count) {
      const interval = setInterval(
        () => { setCounterTicketsNew(prev => prev + 1) }
        , 100)
      return () => clearInterval(interval)
    }
  }
    , [isSuccessDataTicketsNew, counterTicketsNew, dataTicketsNew?.count])
  useEffect(() => {
    if (counterTicketsClosed < dataTicketsClosed?.count) {
      const interval = setInterval(
        () => { setCounterTicketsClosed(prev => prev + 1) }
        , 50)
      return () => clearInterval(interval)
    }
  }
    , [isLoadingDataTicketsClosed, counterTicketsClosed, dataTicketsClosed?.count])


  const handleOnClick = (status) => {
    dispatch(setFiltersToTickets({ status }))

    navigate(`/tickets/`)
  }


  let content
  if (isLoadingGetTicketsByTworcaId || isLoadingDataTicketsNew || isLoadingDataTicketsClosed || isLoadingDataTicketsInRealizations) {
    content = <Spinner />
  }
  else if (isSuccessGetTicketsByTworcaId && isSuccessDataTicketsNew && isSuccessDataTicketsClosed && isSuccessDataTicketsInRealizations) {
    content =
      <Container fluid >
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

                <Table striped="rows" size="sm" responsive={true}>
                  <thead>
                    <tr>
                      <th>Temat</th>
                      <th style={{ textAlign: 'center' }}>Status</th>
                      <th>Data utworzenia</th>
                      <th>Szczegóły</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataTicketsUser?.rows.map((ticketUser, i) => {
                      return (
                        <tr key={i}>
                          <td>{ticketUser.temat}</td>
                          <td style={{ backgroundColor: ticketUser?.status === "Zamknięte" ? "#f0ad4e" : "#5cb85c", textAlign: 'center' }}>{ticketUser.status}</td>
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
            <Card onClick={() => handleOnClick("Nowe")} className='shadow m-2 card-hover' >
              <Card.Body>
                <div className="d-flex justify-content justify-content-between">
                  <h5>Wszystkie nowe zgłoszenia </h5>
                  <h1><Badge pill={true} bg='dark'> {counterTicketsNew}</Badge>  </h1>
                </div>
              </Card.Body>
            </Card>
            <Card onClick={() => handleOnClick("Zamknięte")} className='shadow m-2 card-hover'  >
              <Card.Body>
                <div className="d-flex justify-content justify-content-between">
                  <h5>Wszystkie zamknięte zgłoszenia </h5>
                  <h1><Badge pill={true} bg='dark'> {counterTicketsClosed}</Badge>  </h1>
                </div>
              </Card.Body>
            </Card>
            <Card onClick={() => handleOnClick("W realizacji")} className='shadow m-2 card-hover' >
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
import { Alert, Badge, Button, Card, Col, Container, ListGroup, Row, Spinner, Tab, Table, Tabs } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { useDeleteAcceptTicketMutation, useGetTicketQuery, useUpdateAcceptTicketMutation } from '../store/api/mainApi';
import TicketPanelActions from './TicketPanelActions';
import PostsManager from './TicketPosts';
import { TimeAgo } from './TimeAgo';
// import { useSelector } from 'react-redux';
import { Text } from '@chakra-ui/react';
import { TicketAddAccept } from './TicketAddAccept';
import { TicketPostAddForm } from './TicketPostAddForm';
import HistoryStepper from './HistoryStepper';
export default function TicketSinglePage() {
  const { id } = useParams();
  const { data: ticket, isSuccess, isLoading } = useGetTicketQuery(parseInt(id))
  const [deleteAccept] = useDeleteAcceptTicketMutation()
  const [updateAccept] = useUpdateAcceptTicketMutation()

  const handleDeleteAccept = async (userLogin, ticketId) => {
    try {
      await deleteAccept({ userAcceptId: userLogin, ticketAcceptId: ticketId })
    } catch (error) {
      console.error(error.message);

    }
  }
  const handleUpdateAccept = async (userLogin, ticketId, status) => {
    try {
      const response = await updateAccept({ userAcceptId: userLogin, ticketAcceptId: ticketId, status }).unwrap()
      console.log(response);
    } catch (error) {
      console.error(error.message);

    }
  }


  let content;
  if (isLoading) {
    content = <Spinner size='sm' />
  } else if (isSuccess) {
    content = <Container className='fluid' >
      <Row className='m-2 '>
        <TicketPanelActions ticket={ticket} />
      </Row>
      <Row className='m-2'>
        <Col sm={12} md={12} lg={12} xs={12} xl={3} xxl={3} >
          <Row className='my-1'>
          <Card className='shadow ' style={{ padding: 0 }}>
              <Card.Header><b>Parametry podstawowe</b></Card.Header>
              <Card.Body>

              <ListGroup variant="flush">
            
                <ListGroup.Item><b>Temat</b> : {ticket?.temat}</ListGroup.Item>
                <ListGroup.Item><b>Kategoria</b> : {ticket?.Category?.name}</ListGroup.Item>
                <ListGroup.Item><b>Status</b> : {ticket?.status}</ListGroup.Item>
                <ListGroup.Item><b>Utworzone :</b> <TimeAgo timestamp={ticket?.createdAt} /></ListGroup.Item>
                <ListGroup.Item><b>Zmodyfikowane</b> : <TimeAgo timestamp={ticket?.updatedAt} /></ListGroup.Item>
              </ListGroup>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Card className='shadow ' style={{ padding: 0 }}>
              <Card.Header><b>Historia akceptacji</b></Card.Header>
              <Card.Body>
                <TicketAddAccept />
                {Array.from(ticket?.ticketAccepts).length ?
                  <Table responsive>
                    <tbody>
                      {
                        ticket?.ticketAccepts?.map((accept, i) => {
                          return (
                            <tr key={i}>
                              <td>
                                {accept?.name} {accept?.surname} ({accept?.login})
                              </td>
                              <td>
                                <Badge
                                  bg={accept?.TicketsAccepts?.status === 'Odrzucone' ? 'danger' : accept?.TicketsAccepts?.status === 'Zaakceptowane' ? 'success' : 'secondary'}>
                                  {accept?.TicketsAccepts?.status}
                                </Badge>
                              </td>

                              <td>
                                <Button variant='light' size='sm' title='Zaakceptuj' onClick={() => handleUpdateAccept(accept?.login, ticket.id, "Zaakceptowane")}>Zaakceptuj</Button>
                              </td>
                              <td>
                                <Button variant='light ' size="sm" title='Odrzuć' onClick={() => handleUpdateAccept(accept?.login, ticket.id, "Odrzucone")}>Odrzuć</Button>
                              </td>
                              <td>
                                <Button variant='danger' size="sm" title='Usuń akceptację' onClick={() => handleDeleteAccept(accept?.login, ticket.id)}><AiFillDelete /></Button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                  : <Alert className='mt-2 bg-light border-danger small' >Brak przypisanych akceptacji</Alert>
                }
              </Card.Body>
            </Card>
          </Row>

        </Col>
        <Col sm={12} md={12} lg={12} xs={12} xl={6} xxl={6} >
          <Row className='my-1'>
            <Card className='shadow' style={{ padding: 0 }} >
              <Card.Header>
                <b>Opis</b>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  {ticket?.tresc}
                </Card.Text>
                {ticket?.fileName ? <Card.Img variant="top" src={"https://hidden-dusk-87411-ba77d74a1dd4.herokuapp.com/uploads/" + ticket?.fileName} /> : ""}
              </Card.Body>
            </Card>
          </Row>
          <Row className='my-1'>
            < TicketPostAddForm />
          </Row>
          <Row >
            <PostsManager ticketid={ticket.id} />
          </Row>
          <Row>
          <Card className='shadow' style={{ padding: 0 }} >
              <Card.Header>
                <b>Historia zgłoszenia</b>
              </Card.Header>
              <Card.Body>
                <HistoryStepper/>
              </Card.Body>
            </Card>
          </Row>
        </Col>
        <Col sm={12} md={12} lg={12} xs={12} xl={3} xxl={3}>
          <Row className='my-1'>
            <Card className='shadow' style={{ padding: 0 }}>
              <Card.Header><b>SLA</b></Card.Header>
              <Card.Body>
                <Text fontWeight='900'> SLA Standard</Text>
                <Text fontWeight='500'> Data reakcji :</Text>
                <Text fontWeight='500'> Upłyneło  :</Text>
              </Card.Body>
            </Card>
          </Row>
          <Row className='my-1'>
            <Card className='shadow' style={{ padding: 0 }}>
              <Card.Header>
                <b>Osoby powiązane</b>
              </Card.Header>
              <ListGroup variant="flush">

                <Tabs
                  defaultActiveKey="autor"
                  id="justify-tab-example"
                  className="mb-3"
                  justify
                  transition
                >
                  <Tab eventKey="autor" title="Autor">
                    <ListGroup variant="flush">
                      <ListGroup.Item><b>Imię nazwisko :</b>   {ticket?.tworca?.name + " " + ticket?.tworca?.surname} </ListGroup.Item>
                      <ListGroup.Item><b>Zakład :</b>   {ticket?.tworca?.zaklad}</ListGroup.Item>
                      {ticket?.tworca?.email ? <ListGroup.Item><b>Email</b> {ticket?.tworca?.email} </ListGroup.Item> : null}
                      {ticket?.tworca?.telefon ? <ListGroup.Item><b>Telefon</b> {ticket?.tworca?.telefon} </ListGroup.Item> : null}
                      {ticket?.tworca?.dzial ? <ListGroup.Item><b>Dział</b> {ticket?.tworca?.dzial} </ListGroup.Item> : null}
                      {ticket?.tworca?.ulica ? <ListGroup.Item><b>Adres</b> {ticket?.tworca?.kraj + " " + ticket?.tworca?.wojewodztwo + " " + ticket?.tworca?.ulica + " " + ticket?.tworca?.kodpocztowy} </ListGroup.Item> : null}
                    </ListGroup>

                  </Tab>
                  <Tab eventKey="zglaszajacy" title="Zgłaszający">
                    <ListGroup variant="flush">
                      <ListGroup.Item><b>Imię nazwisko :</b>   {ticket?.zglaszajacy?.name + " " + ticket?.zglaszajacy?.surname} </ListGroup.Item>
                      <ListGroup.Item><b>Zakład :</b>   {ticket?.zglaszajacy?.zaklad}</ListGroup.Item>
                      {ticket?.zglaszajacy?.email ? <ListGroup.Item><b>Email</b> {ticket?.zglaszajacy?.email} </ListGroup.Item> : null}
                      {ticket?.zglaszajacy?.telefon ? <ListGroup.Item><b>Telefon</b> {ticket?.zglaszajacy?.telefon} </ListGroup.Item> : null}
                      {ticket?.zglaszajacy?.dzial ? <ListGroup.Item><b>Dział</b> {ticket?.zglaszajacy?.dzial} </ListGroup.Item> : null}
                      {ticket?.zglaszajacy?.ulica ? <ListGroup.Item><b>Adres</b> {ticket?.zglaszajacy?.kraj + " " + ticket?.zglaszajacy?.wojewodztwo + " " + ticket?.zglaszajacy?.ulica + " " + ticket?.zglaszajacy?.kodpocztowy} </ListGroup.Item> : null}
                    </ListGroup>
                  </Tab>
                  <Tab eventKey="opiekunowie" title="Opiekunowie">
                    <ListGroup variant="flush">
                      {Array.from(ticket?.opiekunowie).length ?
                        ticket?.opiekunowie?.map((opiekun, i) => {
                          return (<ListGroup.Item key={i}>
                            {opiekun?.name + " " + opiekun?.surname + " (" + opiekun?.login + ")"}
                          </ListGroup.Item>)
                        })
                        :
                        <ListGroup.Item className='mt-2 bg-light border-danger small' >Brak przypisanych opiekunów</ListGroup.Item>
                      }
                    </ListGroup>
                  </Tab>
                </Tabs>
              </ListGroup>
            </Card>
          </Row>




        </Col>
      </Row>
      <Row className='m-2'>

      </Row>
      <Row className='m-2'>





      </Row>
    </Container>
  } else {
    console.error("errror")
  }


  return (
    <>
      {content}



    </>
  )
}

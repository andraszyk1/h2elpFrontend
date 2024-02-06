import { Alert, Badge, Button, Card, Col, Container, ListGroup, Placeholder, Row, Table } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { useDeleteAcceptTicketMutation, useGetTicketQuery, useUpdateAcceptTicketMutation } from '../store/api/mainApi';
import TicketPanelActions from './TicketPanelActions';
import PostsManager from './TicketPosts';
import { TimeAgo } from './TimeAgo';
// import { useSelector } from 'react-redux';
import { TicketAddAccept } from './TicketAddAccept';
import { TicketPostAddForm } from './TicketPostAddForm';
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
    content = <Container className='fluid' >
      <Row className='m-2 '>
        <TicketPanelActions ticket={ticket} />
      </Row>
      <Row className='m-2'>
        <Col className='m-2'>
          <Card>
            <Placeholder as={ListGroup} animation="glow">
              <Placeholder as={ListGroup.Item} animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
              <Placeholder as={ListGroup.Item} animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
            </Placeholder>
          </Card></Col>
        <Col className='m-2 '>
          <Card>
            <Placeholder as={ListGroup} animation="glow">
              <Placeholder as={ListGroup.Item} animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
              <Placeholder as={ListGroup.Item} animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
              <Placeholder as={ListGroup.Item} animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
              <Placeholder as={ListGroup.Item} animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
            </Placeholder>
          </Card></Col>
        <Col className='m-2'>
          <Card>
            <Card.Header><b>Lista opiekunów tego zgloszenia:</b></Card.Header>
            <Placeholder as={ListGroup} animation="glow">
              <Placeholder as={ListGroup.Item} animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
            </Placeholder>
          </Card>
        </Col>
      </Row>
      <Row className='m-2'>
        <Col className='m-2'>
          <Card>
            <Card.Header><b>Historia akceptacji:</b></Card.Header>
            <Card.Body>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  } else if (isSuccess) {
    content = <Container className='m-2 fluid' >
      <Row className='m-2 shadow '>
        <TicketPanelActions ticket={ticket} />
      </Row>
      <Row className='m-2'>
        <Col sm={12} md={12} lg={12} xs={12} xl={3} xxl={3} >
          <Row className='my-1'>
            <Card className='shadow'>
              <ListGroup variant="flush">
                <ListGroup.Item><b>Temat</b> : {ticket?.temat}</ListGroup.Item>
                <ListGroup.Item><b>Kategoria</b> : {ticket?.Category?.name}</ListGroup.Item>
                <ListGroup.Item><b>Status</b> : {ticket?.status}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Row>

          <Row className='my-1'>
            <Card className='shadow'>
              <ListGroup variant="flush">
                <ListGroup.Item><b>Utworzone :</b> <TimeAgo timestamp={ticket?.createdAt} /></ListGroup.Item>
                <ListGroup.Item><b>Zmodyfikowane</b> : <TimeAgo timestamp={ticket?.updatedAt} /></ListGroup.Item>
                <ListGroup.Item><b>Utworzone przez</b> {ticket?.tworca?.name + " " + ticket?.tworca?.surname} </ListGroup.Item>
                <ListGroup.Item><b>Zgłoszone przez :</b> {ticket?.zglaszajacy?.name + " " + ticket?.zglaszajacy?.surname} </ListGroup.Item>
              </ListGroup>
            </Card>
          </Row>
        </Col>
        <Col sm={12} md={12} lg={12} xs={12} xl={4} xxl={4} >
          <Row className='my-1'>
            <Card className='shadow' style={{ padding: 0 }} >
              <Card.Header>
                <b>Treść</b>
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
        </Col>
        <Col sm={12} md={12} lg={12} xs={12} xl={5} xxl={5} >
          <Row className='my-1'>
            <Card className='shadow' style={{ padding: 0 }}>
              <Card.Header><b>Lista opiekunów tego zgloszenia:</b></Card.Header>
              <Card.Body>
                {Array.from(ticket?.opiekunowie).length ?
                  ticket?.opiekunowie?.map((opiekun, i) => {
                    return (<Card.Text key={i}>
                      {opiekun?.name + " " + opiekun?.surname + " (" + opiekun?.login + ")"}
                    </Card.Text>)
                  })
                  :
                  <Alert className='mt-2 bg-light border-danger small' >Brak przypisanych opiekunów</Alert>
                }
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Card className='shadow ' style={{ padding: 0 }}>
              <Card.Header><b>Historia akceptacji:</b></Card.Header>
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

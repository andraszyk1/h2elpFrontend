import *  as React from 'react'
import {
  Alert,
  Badge,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner
} from 'react-bootstrap'
import { MdArrowBack, MdArrowForward, MdBook } from 'react-icons/md'
import { useGetPostsQuery, Ticket } from '../store/api/postsApi'
import { TimeAgo } from './TimeAgo'
import TicketPostAddBtn from './TicketPostAddBtn'


const TicketPosts = ({ id }: Ticket) => {
  const [page, setPage] = React.useState(1)
  const [ticketId] = React.useState(id)
  const { data: posts, isLoading } = useGetPostsQuery({ ticketId, page })
  console.log(posts);
  let content, contentHeader, contentAlert
  if (isLoading) {
    content = <Spinner />
    contentHeader = ""
    contentAlert = ""
  } else if (!posts?.rows) {
    contentAlert = <ListGroup><ListGroupItem>No posts :</ListGroupItem></ListGroup>
    content = ""
    contentHeader = <Card style={{ padding: 0 }}>
      <Card.Header>

        <Col sm={4} lg={4} xs={4} xl={4} xxl={4}>
          <TicketPostAddBtn ticketId={ticketId} />
          <b>Komentarze:</b> {``}
        </Col>
        <Col sm={4} lg={4} xs={4} xl={4} xxl={4}>

        </Col>
        <Col sm={4} lg={4} xs={4} xl={4} xxl={4} style={{ textAlign: "right" }}>


          <button>
            <MdArrowBack style={{ cursor: 'pointer' }}
              onClick={() => setPage((prev) => prev - 1)}
            />
          </button>
          <MdArrowForward style={{ cursor: 'pointer' }}
            onClick={() => setPage((prev) => prev + 1)}

          />

        </Col>

      </Card.Header>
    </Card>
  }
  else {
    contentHeader = ""
    contentAlert = ""
    content =
      <><Card className='shadow' style={{ padding: 0 }} >
        <Card.Header>
          <Row>
            <Col sm={6} md={6} lg={6} xs={6} xl={6} xxl={6}>
              <TicketPostAddBtn ticketId={ticketId} />
              <b>Komentarze:</b> {`${page} / ${posts?.totalPages}`}
            </Col>

            <Col sm={6} md={6} lg={6} xs={6} xl={6} xxl={6} style={{ textAlign: "right" }}>
              <MdArrowBack style={{ cursor: 'pointer', width: "1.5rem", height: "1.5rem" }}
                onClick={() => setPage((prev) => page === 1 ? prev : prev - 1)}

              />
              <MdArrowForward style={{ cursor: 'pointer', width: "1.5rem", height: "1.5rem" }}
                onClick={() => setPage((prev) => page === posts.totalPages ? prev : prev + 1)}
              />

            </Col>
          </Row>
        </Card.Header>

       {Array.from(posts?.rows).length ?
        <ListGroup>
          {posts?.rows.map(({ content, status, createdAt, User }, i) => (
            <ListGroupItem key={i}>
              <MdBook />
              {User.name + " " + User.surname}{' '}
              {content}{' '}
              <Badge>{status}</Badge>{' '}
              <small><TimeAgo timestamp={createdAt} /></small>
            </ListGroupItem>
          ))}
        </ListGroup>
        :
        <Alert  className='m-2 bg-light border-danger small' >Brak dodanych komentarzy</Alert>
          }
        </Card>
      </>
  }
  return (
    <>
      {contentHeader}
      {content}
      {contentAlert}
    </>
  )
}




export const PostsManager = ({ ticketid }: any) => {
  return (
    <>
      <TicketPosts id={ticketid} />

    </>
  )
}

export default PostsManager

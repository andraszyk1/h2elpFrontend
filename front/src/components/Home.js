import React from "react"
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Login from "./Login";
export default function Home(){

    return (<>

    <Container className="m-4" style={{ width: '100%',
  height: '500px',backgroundSize: '30% auto',
backgroundRepeat: 'no-repeat',backgroundImage: "url('./hero-bg.png')"}}>
  <Row>
  <Col lg={5}>
    
     </Col>
  <Col lg={7}>
     <Login/>
     </Col>
     </Row>
      {/* <Row>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <h5>Dashboard Card 1</h5>
              <p>Some content for card 1.</p>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <h5>Dashboard Card 2</h5>
              <p>Some content for card 2.</p>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <h5>Dashboard Card 3</h5>
              <p>Some content for card 3.</p>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <h5>Dashboard Card 4</h5>
              <p>Some content for card 4.</p>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}
    </Container>
    
    
    </>)
}
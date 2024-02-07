import React from "react";
import { useSelector,useDispatch } from "react-redux";
import {Row,Col, Button} from 'react-bootstrap';
import { increment,decrement,incrementByAmount } from "../store/slices/counterSlice";
export function Counter(){
const count = useSelector(state=>state.counter.value);
const dispatch=useDispatch();
    
    return(
        <Row style={{}}>
            <Col>
            <Button onClick={()=>dispatch(increment())}>Add +1</Button>
            <Button onClick={()=>dispatch(decrement())}>Add -1</Button>
            <Button onClick={()=>dispatch(incrementByAmount(5))}>Add 5</Button>
            </Col>
            <Col>
            <h1>{count}</h1>
      
            </Col>
        </Row>
    )
}
import React from "react";
import { Form,Button } from "react-bootstrap";
import { useDispatch,useSelector} from "react-redux";
import { setSearch,selectSearch} from "../store/slices/usersSlice";

export function UserSearch(){
  const searchSelector=useSelector(selectSearch)
    const dispatch=useDispatch();
    const handleUserSearch = (search) =>{
        dispatch(setSearch(search))
    }
    const handleClick=(e)=>{
      e.preventDefault()
      dispatch(setSearch(searchSelector))
    }
    return(
    <Form className="d-flex" >
    <Form.Control
      type="search"
      placeholder="Szukaj"
      className="me-2"
      aria-label="Szukaj"
      value={searchSelector}
      onChange={(e)=>handleUserSearch(e.target.value)}
    />
  </Form>)
}
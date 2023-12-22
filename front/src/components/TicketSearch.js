import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, selectSerch } from "../store/slices/ticketsSlice";

export function TicketSearch() {
  const searchSelector = useSelector(selectSerch)
  const dispatch = useDispatch();
  const handleTicketSearch = (e) => {
    dispatch(setSearch(e.target.value))
  }
  return (
    <Form className="d-flex" >
      <Form.Control
        type="search"
        placeholder="Szukaj"
        className="me-2"
        aria-label="Szukaj"
        value={searchSelector}
        onChange={(e)=>handleTicketSearch(e)}
      />
    </Form>)
}
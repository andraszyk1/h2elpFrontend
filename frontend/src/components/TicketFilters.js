import React, { useEffect } from "react";
import { Form, Accordion, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setFiltersToTickets, clearFilters, setSearch, selectFilters,selectFilteredTickets,setTicketsToFilter } from "../store/slices/ticketsSlice";
import { AiOutlineClose } from 'react-icons/ai'
import { statusConfig } from "./EnumsCustom";
import RSelect1, { mapDataForSelects } from "./RSelect1";
import { useGetCategoriesQuery } from "../store/api/categoriesApi";
export function TicketFilters() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters)

  const { data: kategorieData, isSuccess: isSuccessCategories } = useGetCategoriesQuery();

  const handleClearFilters = () => {
    dispatch(clearFilters({}))
    dispatch(setSearch(''))
  }

  const handleFilters = (e, input) => {
    let value, name, target;
    target = e.target ? e.target : e;
    value = target.value;
    name = input ? input : target.name
    console.log({...filters,[name]: value});
    dispatch(setFiltersToTickets({...filters,[name]: value}))
  }

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Filtry</Accordion.Header>
        <Accordion.Body>
          <Form >
            <Row className="m-2">
              <Button title="Czyść filtry" variant="secondary" onClick={handleClearFilters}><AiOutlineClose /> Czyść filtr</Button>
            </Row>
            <Row className="m-2">
              <Col>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <RSelect1 onChange={handleFilters} options={mapDataForSelects(statusConfig, { value: item => item, name: item => item })}   inputName="status" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Kategoria</Form.Label>
                  {isSuccessCategories && <RSelect1 onChange={handleFilters} options={mapDataForSelects(kategorieData, { value: item => item?.name, name: item => item?.name })} value={filters?.category} placeholder={filters?.category} inputName="category" />}
                </Form.Group>
              </Col>

            </Row>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
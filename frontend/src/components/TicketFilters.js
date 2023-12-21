import React, { useEffect, useRef, useState } from "react";
import { Form, Accordion, Spinner, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setFiltersToTickets, clearFilters, setSearch } from "../store/slices/ticketsSlice";
import { useGetCategoriesQuery } from '../store/api/categoriesApi';
import { AiOutlineClose } from 'react-icons/ai'
import { statusConfig } from "./EnumsCustom";
import RSelect1, { mapDataForSelects } from "./RSelect1";
import { useParams } from "react-router-dom";
export function TicketFilters({filtersFromDashboard}) {
  const params=useParams()
  let initialFilters;
  if(params?.filter){
    initialFilters=filtersFromDashboard
  }else{
    initialFilters={ status: "", category: "" }
  }
  const dispatch = useDispatch();
  const refRSelect1 = useRef();
  const [filters, setFilters] = useState(initialFilters);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [defaultStatus, setDefaultStatus] = useState("");
  const [defaultCategory, setDefaultCategory] = useState("");
  const { data: kategorieData, isSuccess: isSuccessCategories, isError: isErrorCategories, isLoading: isLoadingCategories } = useGetCategoriesQuery();

  useEffect(()=>{
    dispatch(setFiltersToTickets(filters))
    setDefaultStatus("Wszystkie")
    setDefaultCategory("Wszystkie")
  },[])
  useEffect(()=>{
    dispatch(setFiltersToTickets(filters))
    setDefaultStatus(filters?.status)
    setDefaultCategory(filters?.category)
  },[filters])
  const handleClearFilters = () => {
    setFilters({ status: "", category: "" })
    dispatch(clearFilters({ status: "", category: "" }))
    dispatch(setSearch(''))
 

  }
  const handleFilters = (e, input) => {
    let value, name, target;
    target = e.target ? e.target : e;
    if (Array.isArray(e)) {
      name = input
      value = e.map((item) => {
        return {
          opiekunId: item.value
        }
      })
    }
    else {
      value = target.type === 'checkbox' ? target.checked : target.value;
      name = input ? input : target.name
    } e = target.name

    setFilters({
      ...filters,
      [name]: value,
    });
    setSelectedCategory(filters?.category)
    setSelectedStatus(filters?.status)

 
    dispatch(setFiltersToTickets({
      ...filters,
      [name]: value,
    }))

  }
  let optionsKategorie, selectCategory, optionsStatus, selectStatus
  if (isSuccessCategories) {
    optionsKategorie = mapDataForSelects(kategorieData, { value: item => item.name, name: item => item.name })
    selectCategory = isLoadingCategories ? <Spinner /> : <RSelect1 onChange={handleFilters} options={optionsKategorie} value={selectedCategory} placeholder={defaultCategory}  inputName="category" />;
    optionsStatus = mapDataForSelects(statusConfig, { value: item => item, name: item => item })
    selectStatus = <RSelect1 onChange={handleFilters} options={optionsStatus} value={selectedStatus} placeholder={defaultStatus}  inputName="status" />;
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
                  {selectStatus}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
<Form.Label>Kategoria</Form.Label>
                  {selectCategory}
                </Form.Group>
              </Col>

            </Row>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
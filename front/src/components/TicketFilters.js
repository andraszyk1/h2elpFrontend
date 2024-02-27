import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { useGetCategoriesQuery } from "../store/api/categoriesApi";
import { clearFilters, selectFilters, setFiltersToTickets, setSearch } from "../store/slices/ticketsSlice";
import { statusOpcje } from "./Forms";
import RSelect1 from "./RSelect1";
export function TicketFilters() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters)

  const { data: kategorieData } = useGetCategoriesQuery();
  useEffect(() => {
    console.log(filters);
  }, [filters])
  const handleClearFilters = () => {
    dispatch(clearFilters({}))
    dispatch(setSearch(''))

  }

  const handleFilters = (e, input) => {

    let value, name, target;
    target = e.target ? e.target : e;
    value = target?.value;
    name = input ? input : target?.name
    console.log(e, input)
    console.log({ ...filters, [name]: value });
    dispatch(setFiltersToTickets({ ...filters, [name]: value }))
  }

  return (

    <Form >
      <Row>
        <Col sm={12} md={12} lg={6} xs={12} xl={6} xxl={6} >
          <Row >
            <Col className="mb-1" sm={12} md={12} lg={6} xs={12} xl={6} xxl={6} >

              <RSelect1 placeholder="Wybierz status" onChange={handleFilters} options={statusOpcje?.map((item) => ({ value: item, label: item }))} inputName="status" defaultInputValue={filters?.status} defaultValue={filters?.status} />

            </Col>
            <Col className="mb-1" sm={12} md={12} lg={6} xs={12} xl={6} xxl={6} >

              {<RSelect1 placeholder='Wybierz kategorię' onChange={handleFilters} options={kategorieData?.map((item) => ({ value: item.name, label: item.name }))} inputName="category" defaultInputValue={filters?.category} defaultValue={filters?.category} />}

            </Col>

          </Row>
        </Col>
        <Col sm={12} md={12} lg={6} xs={12} xl={6} xxl={6} >

          <Button size="sm" title="Czyść filtry" variant="secondary" onClick={handleClearFilters}><AiOutlineClose /> Czyść filtry</Button>

        </Col>
      </Row>
    </Form>

  )
}
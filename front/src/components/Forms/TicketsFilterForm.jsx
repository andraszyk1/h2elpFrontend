import { Form, Formik } from "formik";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { MySelect, statusOpcje } from '.';
import { setFiltersToTickets } from "../../store/slices/ticketsSlice";
import { setShowToast } from "../../store/slices/toastSlice";
import { useGetTicketsQuery } from "../../store/api/mainApi";
const TicketsFilterForm = () => {
    const { data: ticketsData, isSuccess: isSuccessTickets } = useGetTicketsQuery({ search: "", status: "", category: "", limit: 10 });
    function getUniqeValuesOfArray(arr) {
        let outputArray = Array.from(new Set(arr))
        return outputArray
    }
    const CategoriesArray = ticketsData?.map(ticket => (
        ticket?.Category?.name
    ));

    const tworcaArray= ticketsData?.map(ticket => (
        ticket?.tworca?.login
    ));
  
    const uniqueCategories = getUniqeValuesOfArray(CategoriesArray);
    const uniqueTworca = getUniqeValuesOfArray(tworcaArray);
   console.log(uniqueTworca);

   
  
    const [filters, setFilters] = useState({})
    const dispatch = useDispatch();
    const handleSetFilter = (filter) => {
        const { filterName, filterValue } = filter
        setFilters({ ...filters, [filterName]: filterValue });
        dispatch(setFiltersToTickets({ ...filters, [filterName]: filterValue }))
    }
    return (
        <>
            {isSuccessTickets && <Formik
                initialValues={{
                    status: "",
                    category: "",
                    tworca: "",
                }}
                validationSchema={Yup.object({
                    status: Yup.mixed().notRequired(),
                    category: Yup.mixed().notRequired(),
                    tworca: Yup.mixed().notRequired(),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    dispatch(setShowToast({ showToast: true, message: `Filtry: ${JSON.stringify(values)}`, variant: 'danger' }));
                    setSubmitting(false);
                }}
            >
                <Form>
                    <Row>
                        <Col sm={12} md={12} xs={12} lg={4} xl={4} xxl={4}>
                            <MySelect setFilter={handleSetFilter} name="status" fieldName="status" options={statusOpcje} placeholder="Filtruj status" />
                        </Col>
                        <Col sm={12} md={12} xs={12} lg={4} xl={4} xxl={4}>
                            <MySelect setFilter={handleSetFilter} name="category" fieldName="category" options={uniqueCategories?.map((item) => ({ value: item, label: item }))} placeholder="Filtruj kategorię" />
                        </Col>
                        <Col sm={12} md={12} xs={12} lg={4} xl={4} xxl={4}>
                            <MySelect setFilter={handleSetFilter} name="tworca" fieldName="tworca" options={uniqueTworca?.map((item) => ({ value: item, label: item }))} placeholder="Filtruj twórcę zgłoszenia" />
                        </Col>
                        {/* <button className='btn btn-dark my-2' type="submit">Filtruj</button> */}
                    </Row>
                </Form>
            </Formik>
            }
        </>
    )
}

export default TicketsFilterForm

import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { MySelect, statusOpcje } from '.';
import { useGetTicketsQuery } from "../../store/api/mainApi";
import { clearFilters, setFiltersToTickets } from "../../store/slices/ticketsSlice";
import { setShowToast } from "../../store/slices/toastSlice";
const TicketsFilterForm = () => {
    const { data, isSuccess, isLoading } = useGetTicketsQuery();
    const [uniqueCategories, setUniqueCategories] = useState([])
    const [uniqueTworca, setUniqueTworca] = useState([])
    const [uniqueTemat, setUniqueTemat] = useState([])
    const [filters, setFilters] = useState({})
    const dispatch = useDispatch();
    function getUniqeValuesOfArray(arr) {
        let outputArray = Array.from(new Set(arr))
        return outputArray
    }
    useEffect(()=>{
        dispatch(clearFilters())
    },[dispatch])
    useEffect(() => {
        if (isSuccess) {
            const CategoriesArray = data?.map(ticket => (
                ticket?.Category?.name
            ));
            const tworcaArray = data?.map(ticket => (
                ticket?.tworca?.login
            ));
            const tematArray = data?.map(ticket => (
                ticket?.temat
            ));
            setUniqueCategories(getUniqeValuesOfArray(CategoriesArray));
            setUniqueTworca(getUniqeValuesOfArray(tworcaArray))
            setUniqueTemat(getUniqeValuesOfArray(tematArray))
        }
    }, [isSuccess])



    const handleSetFilter = (filter) => {
        const { filterName, filterValue } = filter
        setFilters({ ...filters, [filterName]: filterValue });
        dispatch(setFiltersToTickets({ ...filters, [filterName]: filterValue }))
    }
    return (
        <>
            {isSuccess && <Formik
                initialValues={{
                    status: "",
                    category: "",
                    tworca: "",
                    temat:"",
                }}
                validationSchema={Yup.object({
                    status: Yup.mixed().notRequired(),
                    category: Yup.mixed().notRequired(),
                    tworca: Yup.mixed().notRequired(),
                    temat: Yup.mixed().notRequired(),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    dispatch(setShowToast({ showToast: true, message: `Filtry: ${JSON.stringify(values)}`, variant: 'danger' }));
                    setSubmitting(false);
                }}
            >

                <Form>
                    <Row >
                        <Col className="mb-2" xs={12} sm={4} md={4} lg={3} xl={2} xxl={2}>
                            <MySelect setFilter={handleSetFilter} name="category" fieldName="category" options={uniqueCategories?.map((item) => ({ value: item, label: item }))} placeholder="Kategoria" />
                        </Col>
                        <Col className="mb-2" xs={12} sm={4} md={4} lg={3} xl={2} xxl={2}>
                            <MySelect setFilter={handleSetFilter} name="status" fieldName="status" options={statusOpcje} placeholder="Status" />
                        </Col>
                        <Col className="mb-2" xs={12} sm={4} md={4} lg={3} xl={2} xxl={2} >
                            <MySelect setFilter={handleSetFilter} name="tworca" fieldName="tworca" options={uniqueTworca?.map((item) => ({ value: item, label: item }))} placeholder="Twórca" />
                        </Col>
                        <Col className="mb-2" xs={12} sm={4} md={4} lg={3} xl={2} xxl={2} >
                            <MySelect setFilter={handleSetFilter} name="temat" fieldName="temat" options={uniqueTemat?.map((item) => ({ value: item, label: item }))} placeholder="Temat" />
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

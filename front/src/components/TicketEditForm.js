import { Stack } from "@chakra-ui/react";
import { Formik } from "formik";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { MySelect } from '.';
import { setShowToast } from "../store/slices/toastSlice";
import { useGetTicketsQuery } from "../store/api/mainApi";

const TicketEditForm = () => {
    const { id} = useParams();
    const { data, isSuccess, isLoading } = useGetTicketsQuery(id);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(data);
    }, [dispatch])
    useEffect(() => {
        if (isSuccess) {
       
        }
    }, [isSuccess])



  
    return (
        <>
            {isSuccess && <Formik
                initialValues={{
                    status: "",
                    category: "",
                    tworca: "",
                    temat: "",
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
                <Stack spacing="6" as="form" onSubmit={Formik.handleSubmit}>
                    <MySelect  name="category" fieldName="category" placeholder="Kategoria" />
                    <MySelect name="status" fieldName="status"  placeholder="Status" />
                    <MySelect name="tworca" fieldName="tworca"  placeholder="Twórca" />
                    <MySelect  name="temat" fieldName="temat"  placeholder="Temat" />
                </Stack>

            </Formik>
            }
        </>
    )
}

export default TicketEditForm

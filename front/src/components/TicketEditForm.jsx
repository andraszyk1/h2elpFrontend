import { Skeleton, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { setShowToast } from "../store/slices/toastSlice";
import { AsyncSelectUsers, MySelect, MyTextInput, pilonscOpcje, wplywOpcje, zrodloZgloszeniaOpcje } from "./Forms";
import { useGetTicketQuery, useUpdateTicketMutation } from "../store/api/mainApi";
import CardCustom from "./CardCustom";

const TicketEditForm = () => {
    const { id } = useParams();
    const { data, isSuccess, isLoading } = useGetTicketQuery(id);
    const [updateTicket] = useUpdateTicketMutation();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    useEffect(() => {
        if (isSuccess) {
            console.log(data);
        }
    }, [isSuccess]);

    return (
        <>
            {isSuccess && <Formik
                  initialValues={{
                    id:data.id,
                    zglaszajacyId: data.zglaszajacy.login,
                    wplyw: data.wplyw,
                    temat: data.temat,
                    opis: data.tresc,
                    pilnosc: data.pilnosc,
                    zrodloZgloszenia: data.zrodloZgloszenia,
                    tworcaId: data?.tworcaId,
                    CategoryId: data?.CategoryId
            
                  }}
                  validationSchema={Yup.object({
                    zglaszajacyId: Yup.mixed()
                      .required("Pole wymagane"),
                    wplyw: Yup.mixed()
                      .required("Pole wymagane"),
                    pilnosc: Yup.mixed()
                      .required("Pole wymagane"),
                    temat: Yup.string()
                      .max(100, "Temat nie może być dłuższy niż 100 znaków")
                      .required("Pole wymagane"),
                    opis: Yup.string()
                      .max(255, "Opis nie może być dłuższe niż 255 znaków")
                      .min(5, "Opis nie może być krótszy niż 5 znaków")
                      .required("Pole wymagane"),
                    zrodloZgloszenia: Yup.mixed()
                      .required("Pole wymagane"),
                  })}
                onSubmit={async (values, { setSubmitting }) => {
                    await updateTicket(values);
                    setSubmitting(false);
                    navigate("/tickets");
                    dispatch(setShowToast({ showToast: true, message: `Zgłoszenie nr ${data.id} zostało zaktualizowane`, variant: 'info' }))
                }}
            >
                <CardCustom isLoading={isLoading} cardTitle="Edytuj zgłoszenie">
                <Form>
                    <AsyncSelectUsers defaultInputValue={`${data.zglaszajacy.name}  ${data.zglaszajacy.surname} (${data.zglaszajacy.login})`}  name="zglaszajacyId" fieldName="zglaszajacyId" label="Zgłaszający" placeholder="Zgłaszający" />
                    <MySelect name="wplyw" label="Wpływ" fieldName="wplyw" options={wplywOpcje} placeholder="Wybierz..." />
                    <MySelect name="pilnosc" label="Pilność" fieldName="pilnosc" options={pilonscOpcje} placeholder="Wybierz..." />
                    <MyTextInput name="temat" type="text" label="Temat" />
                    <MyTextInput name="opis" type="textarea" label="Opis" />
                    <MySelect name="zrodloZgloszenia" label="Żródło zgłoszenia" fieldName="zrodloZgloszenia" options={zrodloZgloszeniaOpcje} placeholder="Wybierz..." />
                    <button className='btn btn-dark my-2' type="submit">Wyślij</button>
                </Form>
                </CardCustom>
            </Formik>
            }
        </>
    )
}

export default TicketEditForm

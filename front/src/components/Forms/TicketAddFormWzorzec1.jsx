import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AsyncSelectUsers, MySelect, MyTextInput, pilonscOpcje, wplywOpcje, zrodloZgloszeniaOpcje } from '.';
import { useAddTicketMutation } from "../../store/api/mainApi";

export const TicketAddFormWzorzec1 = ({ tworcaId, categoryId }) => {
  const [addTicket, { isLoading: isLoadingAddTicket }] = useAddTicketMutation();
  const navigate = useNavigate()
  return (
    <Formik
      initialValues={{
        zglaszajacy: "",
        wplyw: "",
        temat: "",
        opis: "",
        pilnosc: "",
        zrodloZgloszenia: "",
        tworcaId: tworcaId,
        CategoryId: categoryId

      }}
      validationSchema={Yup.object({
        zglaszajacy: Yup.mixed()
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
        await addTicket(values);
        setSubmitting(false);
        navigate("/tickets");
      }}
    >
      <Form>
        <AsyncSelectUsers name="zglaszajacy" fieldName="zglaszajacy" label="Zgłaszający" placeholder="Zgłaszający" />
        <MySelect name="wplyw" label="Wpływ" fieldName="wplyw" options={wplywOpcje} placeholder="Wybierz..." />
        <MySelect name="pilnosc" label="Pilność" fieldName="pilnosc" options={pilonscOpcje} placeholder="Wybierz..." />
        <MyTextInput name="temat" type="text" label="Temat" />
        <MyTextInput name="opis" type="textarea" label="Opis" />
        <MySelect name="zrodloZgloszenia" label="Żródło zgłoszenia" fieldName="zrodloZgloszenia" options={zrodloZgloszeniaOpcje} placeholder="Wybierz..." />
        <button className='btn btn-dark my-2' type="submit">Wyślij</button>
      </Form>
    </Formik>
  )
}
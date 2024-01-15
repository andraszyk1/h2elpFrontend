import { Formik, Form } from "formik";
import { MySelect, MyTextInput, AsyncSelectUsers, wplywTablica } from '.';
import * as Yup from "yup";

export const FormZasobySieciowe = () => {
  return (
    <Formik
      initialValues={{
        uzytkownik: "",
        wplyw: "",
        temat: "",
        dzial: "",
        imieNazwisko: "",
        idNowegoPracownika: "",
        stanowisko: "",
        zglaszajacyId: ""
      }}
      validationSchema={Yup.object({
        uzytkownik: Yup.string()
          .min(3, "Użytkownik nie może być krótrzy niż 3")
          .required("Pole wymagane"),
        temat: Yup.string()
          .max(35, "Temat nie może być dłuższy niż 35 znaków")
          .required("Pole wymagane"),
        dzial: Yup.string()
          .max(35, "Dział nie może być dłuższy niż 35 znaków")
          .required("Pole wymagane"),
        stanowisko: Yup.string()
          .max(35, "Stanowisko nie może być dłuższe niż 35 znaków")
          .required("Pole wymagane"),
        wplyw: Yup.mixed()
          .required("Pole wymagane"),
        zglaszajacyId: Yup.mixed()
          .required("Pole wymagane"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <MyTextInput label="Użytkownik" name="uzytkownik" type="text" placeholder="uzytkownik" />
        <MySelect name="wplyw" label="Wpływ" fieldName="wplyw" options={wplywTablica} placeholder="Wpływ..." />
        <AsyncSelectUsers name="zglaszajacyId" fieldName="zglaszajacyId" label="Zgłaszający" placeholder="Zgłaszający" />
        <MyTextInput name="temat" type="text" label="Użytkownik" />
        <MyTextInput name="idNowegoPracownika" type="text" label="ID Nowego Pracownika" />
        <MyTextInput name="imieNazwisko" type="text" label="Imię i Nazwisko" />
        <MyTextInput name="dzial" type="text" label="Dział" />
        <MyTextInput name="stanowisko" type="text" label="Stanowisko" />
        <button className='btn btn-dark' type="submit">Zapisz</button>
      </Form>
    </Formik>
  )
}
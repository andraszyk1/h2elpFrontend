import { Formik, Form } from "formik";
import { MySelect, MyTextInput, AsyncSelectUsers, wplywOpcje, pilonscOpcje, dostepDoStronWWWOpcje, kontoDomenoweWindowsOpcje, kontoPocztoweOpcje } from '.';
import * as Yup from "yup";
import { useAddTicketMutation } from '../../store/api/mainApi';
import { useNavigate } from "react-router-dom";
export const TicketAddFormNowyPracownik = ({tworcaId,categoryId}) => {
  const [addTicket] = useAddTicketMutation();
  const navigate = useNavigate()
  return (
    <Formik
      initialValues={{
        zglaszajacy: "",
        wplyw: "",
        temat: "",
        idNowegoPracownika: "",
        imieNazwiskoNowegoPracownika: "",
        dzial: "",
        stanowisko: "",
        imieNazwiskoPrzelozonego: "",
        tresc: "",
        pilnosc: "",
        kontodomenowewindows: "",
        dostepDoStronWWW: "",
        kontoPocztowe: "",
        tworcaId:tworcaId,
        CategoryId:categoryId,
      }}
      validationSchema={Yup.object({
        zglaszajacy: Yup.mixed()
          .required("Pole wymagane"),
        wplyw: Yup.mixed()
          .required("Pole wymagane"),
        temat: Yup.string()
          .max(35, "Temat nie może być dłuższy niż 35 znaków")
          .required("Pole wymagane"),
        idNowegoPracownika: Yup.number().positive().integer(),
        
        imieNazwiskoNowegoPracownika: Yup.string()
          .max(255, "Imię i nazwisko nie może przekroczyć nie może być dłuższy niż 35 znaków")
          .min(8, "Imię i nazwisko nie może mieć mniej niż 8 znaków")
          .required("Pole wymagane"),
        dzial: Yup.string()
          .max(35, "Dział nie może być dłuższy niż 35 znaków")
          .required("Pole wymagane"),
        stanowisko: Yup.string()
          .max(35, "Stanowisko nie może być dłuższe niż 35 znaków")
          .required("Pole wymagane"),
        imieNazwiskoPrzelozonego: Yup.string()
          .max(35, "Imię i nazwisko przełożonego nie może być dłuższe niż 35 znaków")
          .required("Pole wymagane"),
        tresc: Yup.string()
          .max(255, "Opis nie może być dłuższe niż 35 znaków")
          .min(8, "Opis nie może być krótszy niż 8 znaków")
          .required("Pole wymagane"),
        pilnosc: Yup.mixed()
          .required("Pole wymagane"),
        kontodomenowewindows: Yup.mixed()
          .required("Pole wymagane"),
        dostepDoStronWWW: Yup.mixed()
          .required("Pole wymagane"),
         kontoPocztowe: Yup.mixed()
          .required("Pole wymagane")
      })}
      onSubmit={async (values, { setSubmitting }) => {
        await addTicket(values).unwrap();
        navigate("/tickets")
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <AsyncSelectUsers name="zglaszajacy" fieldName="zglaszajacy" label="Zgłaszający" placeholder="Zgłaszający" />
        <MySelect name="wplyw" label="Wpływ" fieldName="wplyw" options={wplywOpcje} placeholder="Wybierz..." />
        <MyTextInput name="temat" type="text" label="Temat" />
        <MyTextInput name="idNowegoPracownika" type="text" label="ID Nowego Pracownika" />
        <MyTextInput name="imieNazwiskoNowegoPracownika" type="text" label="Imię i Nazwisko" />
        <MyTextInput name="dzial" type="text" label="Dział" />
        <MyTextInput name="stanowisko" type="text" label="Stanowisko" />
        <MyTextInput name="imieNazwiskoPrzelozonego" type="text" label="Imię i Nazwisko Przełożonego" />
        <MyTextInput name="tresc" type="textarea" label="Opis" />
        <MySelect name="pilnosc" label="Pilność" fieldName="pilnosc" options={pilonscOpcje} placeholder="Wybierz..." />
        <MySelect name="kontodomenowewindows" label="Konto domenowe Windows" fieldName="kontodomenowewindows" options={kontoDomenoweWindowsOpcje} placeholder="Wybierz..." />
        <MySelect name="dostepDoStronWWW" label="Dostęp do stron WWW" fieldName="dostepDoStronWWW" options={dostepDoStronWWWOpcje} placeholder="Wybierz..." />
        <MySelect name="kontoPocztowe" label="Konto pocztowe" fieldName="kontoPocztowe" options={kontoPocztoweOpcje} placeholder="Wybierz..." />
        <button className='btn btn-dark my-2' type="submit">Wyślij</button>
      </Form>
    </Formik>
  )
}
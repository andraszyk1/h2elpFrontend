import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MyTextInput } from '.';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from "../../store/api/loginApi";
import { authenticateAction } from '../../store/slices/authSlice';
import { setShowToast } from "../../store/slices/toastSlice";
const LoginForm = () => {
  const [loginMutattion, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required("Pole wymagane"),
        password: Yup.string()
          .required("Pole wymagane")
          .min(12, "Wymagana długość hasła to 12 znaków")
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await loginMutattion(values).unwrap();
          console.log(response);
          if (!response?.error && response.isAuthenticated) {
            dispatch(authenticateAction(response))
            navigate('/dashboard')
          } else {
            dispatch(setShowToast({showToast:true,message:"Zły login lub hasło",variant:'danger'}));
        
            
          }
        } catch (error) {
          console.log("Front end error to login");
        }
        setSubmitting(false);
      }}
    >
      <Form>
        <MyTextInput name="username" type="text" label="Login (konto Windows)" />
        <MyTextInput name="password" type="password" label="Hasło" />
        <button className='btn btn-dark my-2' type="submit">Zaloguj</button>
      </Form>
    </Formik>
   
    </>
  )
}

export default LoginForm
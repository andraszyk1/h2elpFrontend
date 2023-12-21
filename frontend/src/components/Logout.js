import React from 'react';
import { Form, Button, Spinner } from 'react-bootstrap'
import { useLogoutMutation } from '../store/api/loginApi';
import { unAuthenticateAction} from '../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Logout() { 
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [logoutMutattion, { isLoading }] = useLogoutMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await logoutMutattion().unwrap();
      dispatch(unAuthenticateAction(response))
      navigate("/")
    } catch (error) {
      console.log("Front end error to login");
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
<Form.Group>
  <Form.Label>Czy napewno wylogować? </Form.Label>
  {isLoading ?<Spinner/> : <Button variant="dark" type="submit" size='sm'>
        Wyloguj
        </Button>}
</Form.Group>
     
    </Form>

  );
}

export default Logout;
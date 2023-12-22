import React, { useState } from 'react';
import { Form, Button, Spinner, Card } from 'react-bootstrap'
import { useLoginMutation } from '../store/api/loginApi';
import { authenticateAction } from '../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [userToLogin, setUserToLogin] = useState({});
  const [loginMutattion,{isLoading}]=useLoginMutation();
  const [message,setMessage]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleInputChange = (e) => {
    const inputname = e.target.name;
    const inputvalue = e.target.value;
    setUserToLogin({ ...userToLogin, [inputname]: inputvalue })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userToLogin);
    try {
      const response = await loginMutattion(userToLogin).unwrap();
      if(response.message!=='usernotfound' && response.isAuthenticated===true){
        dispatch(authenticateAction(response))
        navigate('/dashboard')
        setMessage("Zalogowano poprawnie")
      }else {
        navigate('/login')
        setMessage("Nie można się zalogować tym użytkownikiem")
      }
    } catch (error) {
      console.log("Front end error to login");
    }
  }
  return (
    <Card className='shadow p-4'>
    <Form onSubmit={handleSubmit}>
  {message}
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label><b><h4>Login (konto windows)</h4></b> </Form.Label>
        <Form.Control type="username" placeholder="Login" name='username' onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Hasło </Form.Label>
        <Form.Control type="password" placeholder="Hasło" name='password' onChange={handleInputChange} />
      </Form.Group>
      {isLoading ? <Spinner/> : 
      <Button variant="dark" type="submit">
        Zaloguj
      </Button>
}
    </Form>
    </Card>
  );
}

export default Login;
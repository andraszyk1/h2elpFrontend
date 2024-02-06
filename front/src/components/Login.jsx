import { Card, CardTitle } from 'react-bootstrap';
import LoginForm from './Forms/LoginForm';
const Login=()=>(
    <Card className='shadow p-4 m-4'>
      <CardTitle>Formularz Logowania</CardTitle>
      <LoginForm />
    </Card>
  )
export default Login;

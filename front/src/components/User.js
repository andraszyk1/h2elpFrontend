import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export function User({ user }) {
    const navigate=useNavigate()
    return (
      <tr>
                <td>
                {user?.name} {user?.surname}
                </td>
                <td style={{fontWeight:'bold',textAlign:'center'}}>
               {user?.login}
                </td>
            
                <td colSpan={6} style={{fontWeight:'bold',backgroundColor:'lemonchiffon',textAlign:'center'}}>
                {user?.rcp}
                </td>
                <td style={{backgroundColor:'',textAlign:'center'}}>
                <Button bg="secondary" size="sm" variant="transparent" onClick={()=>{navigate(`/users/${user.login}`)}}>Szczegóły</Button> 
                </td>
                
                
        </tr>
    );
}
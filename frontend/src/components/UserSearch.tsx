import * as React from "react";
import { Form } from "react-bootstrap";
import { useDispatch,useSelector} from "react-redux";
import { setSearch,selectSearch} from "../store/slices/usersSlice";
interface UsersSearchProps{
  handleUserSearch:(search:string)=>void;
}
export const UserSearch:React.FC<UsersSearchProps>=()=>{
  const searchSelector=useSelector(selectSearch)
    const dispatch=useDispatch();
    const handleUserSearch = (search:string) =>{
        dispatch(setSearch(search))
    }

    return(
    <Form className="d-flex" >
    <Form.Control
      type="search"
      placeholder="Szukaj"
      className="me-2"
      aria-label="Szukaj"
      value={searchSelector}
      onChange={(e)=>handleUserSearch(e.target.value)}
    />
  </Form>)
}
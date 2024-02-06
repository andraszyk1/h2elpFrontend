import React from "react";
import { useSelector } from "react-redux";
import { Navigate,Routes } from "react-router-dom";
import Login from "../components/Login";
const PrivateRoutes = ({children}) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    return (
        <React.Fragment>
            {isAuthenticated===true ?<Routes> {children}</Routes> : <Navigate to='/login' element={<Login/>} replace={true}></Navigate>}
        </React.Fragment>
    )
}

export default PrivateRoutes
import React from "react";
import { Route, Navigate } from "react-router-dom";
const LoginProt = ({Logged,children}) => {
    console.log(Logged);
    if (Logged === "true") {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}
export default LoginProt;
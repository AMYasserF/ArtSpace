import React from "react";
import { Route, Navigate } from "react-router-dom";
const ClientProtectedRoute = ({Role,children}) => {
    console.log(Role);
    if (Role === "Client") {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}
export default ClientProtectedRoute;
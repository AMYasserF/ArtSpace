import React from "react";
import { Route, Navigate } from "react-router-dom";
const ArtistProtectedRoute = ({Role,children}) => {
    console.log(Role);
    if (Role === "Artist") {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}
export default ArtistProtectedRoute;
import React, { useState } from "react";
import LoginForm from "../components/LoginFrom"; 
import RegistrationForm from "../components/NewRegistrationFrom"; 

const AuthenticationPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  // Toggle between login and registration forms
  const toggleForm = () => {
    setIsRegistered(!isRegistered);
  };

  return (
    <div className="authentication-page">
      {isRegistered ? (
        // If registered, show registration form
        <RegistrationForm />
      ) : (
        // If not registered, show login form
        <LoginForm onRegister={toggleForm} />
      )}
    </div>
  );
};

export default AuthenticationPage;

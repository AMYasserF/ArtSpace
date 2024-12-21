import React, { useState }  from "react";
import axios  from "axios";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
const apiUrl = "http://localhost:3000";
axios.defaults.withCredentials = true;
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Get the token from the cookies
const GridRegistrationForm = ({ onBack }) => {
  const [name,setName]=useState("");
  const [Email,setEmail]=useState("");
  const [Pass,setPass]=useState("");
  const [Role,setRole]=useState("");
  const [Username,setUsername]=useState("");
  const [Gender,setGender]=useState("");
  const [Address,setAddress]=useState("");
  const [Age,setAge]=useState("");
  const [CardNumber,setCardNumber]=useState("");
  const [Expiry,setExpiry]=useState("");
  const [Phone,setPhone]=useState("");
  const [reg,setReg]=useState(false);
  const [img,setImg]=useState(null);
  const navigate = useNavigate();
async function handleSubmit(e){
    e.preventDefault();

    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', Email);
    formData.append('password', Pass);
    formData.append('role', Role);
    formData.append('username', Username);
    formData.append('gender', Gender);
    formData.append('address', Address);
    formData.append('age', Age);
    formData.append('cardNumber', CardNumber);
    formData.append('cardExpiry', Expiry );
    formData.append('phoneNumber', Phone);
    formData.append('image', img); // Append the file here
    console.log(formData);
    try{  
      const resp = await axios.post(`${apiUrl}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

console.log(resp);
setReg(true);
const token = getCookie('Role');
console.log(token);
console.log("Registered");
toast.success("Registered Successfully");
navigate("/home");
}
catch(err){
  console.log("Error in registration");
  if(err.response){
    toast.error(err.response.data);
  }
  else
    toast.error("Internal server error sorry !");
  console.log(err);}
}
  return (
    <div className="auth-background">
      <ToastContainer/>
      <div className="grid-registration-container">
        <div className="registration-header">REGISTER</div>
        <form className="grid-registration-form" onSubmit={handleSubmit}>

        <div className="form-group profilepicture">
            <label htmlFor="ProfilePicture">Profile Picture</label>
            <input type="file" id="profileimage" name="choose a photo" accept="image/*" required  onChange={(e)=>setImg(e.target.files[0])} />
          </div>
          <div className="form-group fullname">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Enter your full name" required  onChange={(e)=>setName(e.currentTarget.value)} />
          </div>
          <div className="form-group email">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required  onChange={(e)=>setEmail(e.currentTarget.value)} />
          </div>
          <div className="form-group username">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Choose a unique username" required  onChange={(e)=>setUsername(e.currentTarget.value)} />
          </div>
          <div className="form-group password">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Create a password" required  onChange={(e)=>setPass(e.currentTarget.value)} />
          </div>
          <div className="form-group phonenumber">
            <label htmlFor="phone">Phone Number (Optional)</label>
            <input type="tel" id="phone" placeholder="Enter your phone number"  onChange={(e)=>setPhone(e.currentTarget.value)}/>
          </div>
          <div className="form-group visacard">
            <label htmlFor="visa-card">Visa Card Number</label>
            <input
              type="text"
              id="visa-card"
              placeholder="Enter your Visa card number"
              
              onChange={(e)=>setCardNumber(e.currentTarget.value)}
            />
          </div>
          <div className="form-group expiry">
            <label htmlFor="expiry">Expiry Date</label>
            <input
              type="text"
              id="expiry"
              placeholder="MM/YY"
              required
              onChange={(e)=>setExpiry(e.currentTarget.value)}
            />
          </div>
          <div className="form-group age">
            <label htmlFor="age">Age</label>
            <input type="number" id="age" placeholder="Enter your age" required  onChange={(e)=>setAge(e.currentTarget.value)} />
          </div>
          <div className="form-group role">
            <label htmlFor="role">Role</label>
            <select id="role" required  onChange={(e)=>setRole(e.currentTarget.value)}>
              <option value="">Select a role</option>
              <option value="Client">Client</option>
              <option value="Artist">Artist</option>
            </select>
          </div>
          <div className="form-group gender">
            <label htmlFor="gender">Gender</label>
            <select id="gender" required  onChange={(e)=>setGender(e.currentTarget.value)}>
              <option value="">Select your Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group address">
            <label htmlFor="Address">Address</label>
            <input type="text" id="address" placeholder="Enter your address" required  onChange={(e)=>setAddress(e.currentTarget.value)}/>
          </div>
          <div className="form-buttons submit-button">
            <button type="submit" className="registration-button">
              Register
            </button>
          </div>
        </form>
        {reg&&(<div className='alert alert-success'>Registered Successfully</div>)}
      </div>
    </div>
  );
};

export default GridRegistrationForm;

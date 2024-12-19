import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Settings.css'; // Import the CSS file
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const apiUrl = "http://localhost:3000";

const Settings = () => {
  const [userData, setUserData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpireDate, setCardExpireDate] = useState('');

  useEffect(() => {
    // Fetch user data
    axios.get(`${apiUrl}/user/data`)
      .then(response => {
        console.log('User data:', response.data);
        setUserData(response.data);
        setEmail(response.data.email || '');
        setAddress(response.data.address || '');
        setPhoneNumber(response.data.phonenumber || '');
        setCardNumber(response.data.cardnumber || '');
        const expire = formatDate(response.data.expiredate)
        setCardExpireDate(expire || '');
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-4); 
    return `${month}/${year}`;
  };


  const handleFieldChange = (setter) => (e) => setter(e.target.value);


  const handleProfilePictureSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', profilePicture);

    axios.put(`${apiUrl}/register/profilePic`, formData)
      .then(response => {
        alert('Profile picture updated successfully');
        toast.success('Photo updated successfully');
      })
      .catch(error => {
        console.error('Error updating profile picture:', error);
        toast.error(error.response.data);
      });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    axios.put(`${apiUrl}/register/change-password`, { currentpassword:password, password:newPassword })
      .then(response => {
        toast.success('Password updated successfully');
      })
      .catch(error => {
        toast.error(error.response.data);
        console.error('Error updating password:', error);
      });
  };

  const handleUserInfoSubmit = async  (e) => {
    e.preventDefault();
    
    const year = cardExpireDate.slice(-4);
    const month = cardExpireDate.slice(0, 2); 
    const d = `${year}-${month}-01`; 

   
    const updatedData = { email:email,
                          address:address ,
                          phonenumber: phoneNumber, 
                          cardnumber: cardNumber, 
                          cardexpiredate: new Date (d) };
    console.log(updatedData)
 try{

    const result =  await axios.put(`${apiUrl}/register/update-info`, updatedData)
      toast.success('User info updated successfully');
       console.log("result:" + result) 
      }
      catch(err){
        toast.error("failed to update")
        console.log("fail");
      }
     
  };

  return (
    <div className="settings-container">
    <ToastContainer />
    <h1>Settings</h1>

    <div className="section-settings">
      <h2>Profile Information</h2>
      <img src={userData.profilepic} alt="Profile" className="profile-pic-settings" />
      <form onSubmit={handleProfilePictureSubmit} className="form-section-settings">
        <input type="file" onChange={handleProfilePictureChange} />
        <button type="submit">Update Profile Picture</button>
      </form>
    </div>

    <div className="section-settings">
      <h2>Update User Information</h2>
      <form onSubmit={handleUserInfoSubmit} className="form-section-settings">
        <input type="email" placeholder="Email" value={email} onChange={handleFieldChange(setEmail)} />
        <input type="text" placeholder="Address" value={address} onChange={handleFieldChange(setAddress)} />
        <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={handleFieldChange(setPhoneNumber)} />
        <input type="text" placeholder="Card Number" value={cardNumber} onChange={handleFieldChange(setCardNumber)} />
        <input type="text" placeholder="Card Expiry Date" value={cardExpireDate} onChange={handleFieldChange(setCardExpireDate)} />
        <button type="submit">Update Info</button>
      </form>
    </div>

    <div className="section-settings">
      <h2>Change Password</h2>
      <form onSubmit={handlePasswordSubmit} className="form-section-settings">
        <input type="password" placeholder="Current Password" value={password} onChange={handleFieldChange(setPassword)} />
        <input type="password" placeholder="New Password" value={newPassword} onChange={handleFieldChange(setNewPassword)} />
        <button type="submit">Update Password</button>
      </form>
    </div>
  </div>
);
};

export default Settings;
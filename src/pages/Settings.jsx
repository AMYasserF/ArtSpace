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

  useEffect(() => {
    // Fetch user data
    axios.get(`${apiUrl}/user/data`)
      .then(response => {
        console.log('User data:', response.data);
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

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

  return (
    <div className="settings-container">
        <ToastContainer />
      <h1>Settings</h1>
      <div>
        <h2>User Data</h2>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
        <img src={userData.profilepic} style={{width:'35%'}}></img>
        {/* Display other user data as needed */}
      </div>
      <div>
        <h2>Change Profile Picture</h2>
        <form onSubmit={handleProfilePictureSubmit}>
          <input type="file" onChange={handleProfilePictureChange} />
          <button type="submit">Update Profile Picture</button>
        </form>
      </div>
      <div>
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            placeholder="Current Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <button type="submit">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
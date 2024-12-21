import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../css/custom-datepicker.css";
import '../css/Settings.css';
import { ColorRing } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = "http://localhost:3000";

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpireDate, setCardExpireDate] = useState(null); // Using Date object

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/user/data`);
        const data = response.data;

        setUserData(data);
        setEmail(data.email || '');
        setAddress(data.address || '');
        setPhoneNumber(data.phonenumber || '');
        setCardNumber(data.cardnumber || '');

        // Convert UTC date to local time
        if (data.expiredate) {
          const utcDate = new Date(data.expiredate); // Parse UTC date
          setCardExpireDate(utcDate); // Directly use the Date object
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleFieldChange = (setter) => (e) => setter(e.target.value);

  const handleProfilePictureSubmit = async (e) => {
    e.preventDefault();
    if (!profilePicture) {
      toast.error("Please select a profile picture.");
      return;
    }

    const formData = new FormData();
    formData.append('image', profilePicture);

    try {
      await axios.put(`${apiUrl}/register/profilePic`, formData);
      toast.success('Photo updated successfully');
    } catch (error) {
      console.error('Error updating profile picture:', error);
      toast.error('Failed to update profile picture.');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!password || !newPassword) {
      toast.error("Both fields are required.");
      return;
    }

    try {
      await axios.put(`${apiUrl}/register/change-password`, {
        currentpassword: password,
        password: newPassword,
      });
      toast.success('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password.');
    }
  };

  const handleUserInfoSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      email,
      address,
      phonenumber: phoneNumber,
      cardnumber: cardNumber,
      // Convert local date to UTC for backend
      cardexpiredate: cardExpireDate ? new Date(cardExpireDate.getTime() - cardExpireDate.getTimezoneOffset() * 60000).toISOString() : null,
    };

    try {
      await axios.put(`${apiUrl}/register/update-info`, updatedData);
      toast.success('User info updated successfully');
    } catch (error) {
      console.error('Error updating user info:', error);
      toast.error('Failed to update user info.');
    }
  };

  return (
    <div className="settings-container">
      <ToastContainer />
      <h1>Settings</h1>
      {loading ? (
        <div className="spinner-container">
          <ColorRing
            visible={true}
            height={80}
            width={80}
            ariaLabel="color-ring-loading"
            colors={['#83905a', '#98a724', '#868d05', '#4b7c01']}
          />
        </div>
      ) : (
        <>
          <div className="section-settings">
            <h2>Profile Information</h2>
            <img
              src={userData.profilepic || '/default-profile.png'}
              alt="Profile"
              className="profile-pic-settings"
            />
            <form onSubmit={handleProfilePictureSubmit} className="form-section-settings">
              <input type="file" onChange={handleProfilePictureChange} />
              <button type="submit">Update Profile Picture</button>
            </form>
          </div>

          <div className="section-settings">
            <h2>Update User Information</h2>
            <form onSubmit={handleUserInfoSubmit} className="form-section-settings">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleFieldChange(setEmail)}
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={handleFieldChange(setAddress)}
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={handleFieldChange(setPhoneNumber)}
              />
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={handleFieldChange(setCardNumber)}
              />
              <DatePicker
                selected={cardExpireDate}
                onChange={(date) => setCardExpireDate(date)}
                placeholderText="Card Expiry Date"
                dateFormat="MM/yyyy"
                showMonthYearPicker
                className="card-expiry-datepicker"
              />
              <button type="submit">Update Info</button>
            </form>
          </div>

          <div className="section-settings">
            <h2>Change Password</h2>
            <form onSubmit={handlePasswordSubmit} className="form-section-settings">
              <input
                type="password"
                placeholder="Current Password"
                value={password}
                onChange={handleFieldChange(setPassword)}
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={handleFieldChange(setNewPassword)}
              />
              <button type="submit">Update Password</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;

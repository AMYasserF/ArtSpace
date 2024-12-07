import React, { useState,useEffect } from "react";
import PopupForm from "./PopupForm";
import "../../css/manageUsers.css";
import axios from "axios";
const ManageUsers = () => {
  // Example arbitrary data for users
  const [users,setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null); // Tracks the user to be blocked
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Tracks the popup state
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Admin/Users");
        setUsers(response.data);
      } catch (error) {
        console.log("Error fetching user arts", error.response?.data || error.message);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once on mount
  // Opens the popup form for the selected user
  const handleBlockClick = (user) => {
    setSelectedUser(user);
    setIsPopupOpen(true);
  };

  // Closes the popup form
  const handleClosePopup = () => {
    setSelectedUser(null);
    setIsPopupOpen(false);
  };

  return (
    <div className="manage-users">
      <h1>Manage Users</h1>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-row">
            <span>{user.name}</span>
            <span>{user.role}</span>
            <button onClick={() => handleBlockClick(user)}>Block</button>
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <PopupForm user={selectedUser} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default ManageUsers;

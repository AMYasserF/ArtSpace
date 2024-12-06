import React, { useState } from "react";
import PopupForm from "./PopupForm";
import "../../css/manageUsers.css";

const ManageUsers = () => {
  // Example arbitrary data for users
  const users = [
    { id: 1, name: "John Doe", role: "Artist" },
    { id: 2, name: "Jane Smith", role: "Client" },
    { id: 3, name: "Emily Johnson", role: "Artist" },
    { id: 4, name: "Michael Brown", role: "Client" },
    { id: 5, name: "Sarah Lee", role: "Artist" },
  ];

  const [selectedUser, setSelectedUser] = useState(null); // Tracks the user to be blocked
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Tracks the popup state

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

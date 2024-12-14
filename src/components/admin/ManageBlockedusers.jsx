import React, { useState,useEffect } from "react";
import PopupForm from "./PopupForm";
import "../../css/manageUsers.css";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const ManageBlockedUsers = () => {
  // Example arbitrary data for users
  const [users,setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null); // Tracks the user to be blocked
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Tracks the popup state
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Admin/ban/User");
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching user arts", error.response?.data || error.message);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once on mount
  // Opens the popup form for the selected user
  const handleUnBlockClick = (user) => {
    try{
      console.log(user.userid);
      const resp=axios.post("http://localhost:3000/Admin/unban/user",{
        username:user.username,
      });
      toast.success("User has been unblocked successfully");
    }
    catch(err){
      toast.error("Error unblocking user");
      console.log(err);
    }
  };

  // Closes the popup form
  const handleClosePopup = () => {
    setSelectedUser(null);
    setIsPopupOpen(false);
  };

  return (
    <div className="manage-users">
      <ToastContainer/>
      <h1>Manage Users</h1>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-row">
            <span>{user.name}</span>
            <span>{user.role}</span>
            <button onClick={() => handleUnBlockClick(user)}>UnBlock</button>
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <PopupForm user={selectedUser} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default ManageBlockedUsers;

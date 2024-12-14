import React, { useState,useEffect } from "react";
import PopupForm from "./PopupForm";
import "../../css/manageUsers.css";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const ManageUsers = () => {
  // Example arbitrary data for users
  const [users,setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null); // Tracks the user to be blocked
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Tracks the popup state
  const [reason, setReason] = useState(''); // Tracks the reason for blocking the user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Admin/Users");
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching user arts", error.response?.data || error.message);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once on mount
  // Opens the popup form for the selected user
  const handleBlockClick = (user) => {
    try{
      console.log(user.userid);
      const resp=axios.post("http://localhost:3000/Admin/ban/user",{
        userID:user.userid,
        reason:reason
      });
      toast.success("User has been blocked successfully");
    }
    catch(err){
      toast.error("Error blocking user");
      console.log(err);
    }
  };
  const handleMakeAdmin = (user) => {
  };
  const handleChangeRoleToClient = (user) => {
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
            {user.role === 'Admin' ?<button onClick={()=>handleChangeRoleToClient(user)}>UnAdmin</button> :<button onClick={() => handleMakeAdmin(user)}>Block</button>}
            <input type="text" onChange={(e) => setReason(e.target.value)}/>
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

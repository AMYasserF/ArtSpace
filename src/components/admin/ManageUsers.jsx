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
        const response = await axios.get("http://localhost:3000/admin/Users");
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching user ", error.response?.data || error.message);
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
    axios.post("http://localhost:3000/Admin/MakeAdmin",{
      username:user.username
    }).then((response)=>{console.log(response.data);
      toast.success("User has been made admin successfully");
    }).catch((err)=>{toast.error("Error making user admin");
      console.log(err);
      toast.error("Error making user admin");
    })
  };
  const handleChangeRoleToClient = (user) => {
    axios.post("http://localhost:3000/Admin/RemoveAdmin",{
      username:user.username
    }).then((response)=>{
      console.log(response.data);
      toast.success("User has been removed from admin successfully");
    }).catch((err)=>{
      console.log(err);
      toast.error("Error removing user from admin");});
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
            {user.role === 'Admin' ?<button onClick={()=>handleChangeRoleToClient(user)}>UnAdmin</button> :<button onClick={() => handleMakeAdmin(user)}>Make Admin</button>}
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

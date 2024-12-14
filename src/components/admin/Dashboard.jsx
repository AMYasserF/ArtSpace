import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ManageUsers from './ManageUsers';
import ManageArtworksPopup from './ManageArtworksPopup.jsx';
import ManageArtworks from './ManageArtworks.jsx';
import Auctions from './Auctions';
import Exhibitions from './Exhibitions';
import FeedbackModeration from './FeedbackModeration';
import Reports from './Reports';
import MonitorActivity from './MonitorActivity';
import ApproveArtists from './ApproveArtists';
import EditSiteContent from './EditSiteContent';
import ResetPasswords from './ResetPasswords';
import ManageBlockedUsers from './ManageBlockedUsers';
import '../../css/admin.css';
import ManageBannedArtworks from './ManageBannedArtworks.jsx';

const Dashboard = (props) => {
  const [activeComponent, setActiveComponent] = useState('manageUsers');

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'manageUsers':
        return <ManageUsers />;
      case 'manageArtworks':
        return <ManageArtworks />;
        case 'BlockedUsers':
        return <ManageBlockedUsers />;
        case 'auctions':
        return <Auctions />;
      case 'exhibitions':
        return <Exhibitions />;
      case 'feedbackModeration':
        return <FeedbackModeration />;
      case 'reports':
        return <Reports />;
      case 'monitorActivity':
        return <MonitorActivity />;
      case 'approveArtists':
        return <ApproveArtists />;
      case 'editSiteContent':
        return <EditSiteContent />;
      case 'resetPasswords':
        return <ResetPasswords />;
      case 'BannedArtworks':
        return <ManageBannedArtworks />;
      default:
        return <ManageUsers />;
    }
  };
  return (
    props.Role!='Admin'||props.Role==null?
    <Navigate to="/login" />  :
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin Dashboard</h2>
        <nav>
          <ul>
            <li onClick={() => setActiveComponent('manageUsers')}>Manage Users</li>
            <li onClick={() => setActiveComponent('manageArtworks')}>Manage Artworks</li>
            <li onClick={() => setActiveComponent('BlockedUsers')}>Manage Blocked Users</li>
            <li onClick={() => setActiveComponent('BannedArtworks')}>Manage Deleted Arts</li>
            <li onClick={() => setActiveComponent('auctions')}>Approve Auctions</li>
            <li onClick={() => setActiveComponent('exhibitions')}>Edit Exhibitions</li>
            <li onClick={() => setActiveComponent('feedbackModeration')}>Moderate Feedback</li>
            <li onClick={() => setActiveComponent('reports')}>Generate Reports</li>
            <li onClick={() => setActiveComponent('monitorActivity')}>Monitor Platform Activity</li>
            <li onClick={() => setActiveComponent('editSiteContent')}>Edit Site Content</li>
            <li onClick={() => setActiveComponent('resetPasswords')}>Reset Passwords</li>
          </ul>
        </nav>
      </aside>
      <main className="content">{renderActiveComponent()}</main>
    </div>
  );
};

export default Dashboard;

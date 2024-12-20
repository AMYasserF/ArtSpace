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
      case 'BannedArtworks':
        return <ManageBannedArtworks />;
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
      default:
        return <ManageUsers />;
    }
  };

  return (
    props.Role !== 'Admin' || props.Role == null ? (
      <Navigate to="/login" />
    ) : (
      <div className="container-fluid">
        <div className="row">
          <aside className="col-md-3 bg-dark text-white p-3">
            <h2>Admin Dashboard</h2>
            <nav>
              <ul className="nav flex-column">
                <li className="nav-item mb-2" onClick={() => setActiveComponent('manageUsers')}>
                  <a className="nav-link text-white" href="#">Manage Users</a>
                </li>
                <li className="nav-item mb-2" onClick={() => setActiveComponent('manageArtworks')}>
                  <a className="nav-link text-white" href="#">Manage Artworks</a>
                </li>
                <li className="nav-item mb-2" onClick={() => setActiveComponent('BlockedUsers')}>
                  <a className="nav-link text-white" href="#">Manage Blocked Users</a>
                </li>
                <li className="nav-item mb-2" onClick={() => setActiveComponent('BannedArtworks')}>
                  <a className="nav-link text-white" href="#">Manage Deleted Arts</a>
                </li>
                <li className="nav-item mb-2" onClick={() => setActiveComponent('auctions')}>
                  <a className="nav-link text-white" href="#">Approve Auctions</a>
                </li>
                <li className="nav-item mb-2" onClick={() => setActiveComponent('exhibitions')}>
                  <a className="nav-link text-white" href="#">Edit Exhibitions</a>
                </li>
                <li className="nav-item mb-2" onClick={() => setActiveComponent('feedbackModeration')}>
                  <a className="nav-link text-white" href="#">Moderate Feedback</a>
                </li>
                <li className="nav-item mb-2" onClick={() => setActiveComponent('reports')}>
                  <a className="nav-link text-white" href="#">Generate Reports</a>
                </li>
                <li className="nav-item mb-2" onClick={() => setActiveComponent('monitorActivity')}>
                  <a className="nav-link text-white" href="#">Monitor Platform Activity</a>
                </li>
              </ul>
            </nav>
          </aside>
          <main className="col-md-9 p-3" style={{ minHeight: '100vh' }}>
            {renderActiveComponent()}
          </main>
        </div>
      </div>
    )
  );
};

export default Dashboard;
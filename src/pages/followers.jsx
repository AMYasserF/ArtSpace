import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Followers = () => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/artist/followers');
        setFollowers(response.data);
      } catch (err) {
        console.error("Error fetching followers", err);
      }
    };

    fetchFollowers();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Followers</h1>
      {followers.length > 0 ? (
        <ul className="list-group">
          {followers.map((follower, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{follower.name}</strong>
                <p className="mb-0">{follower.email}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No followers available.</p>
      )}
    </div>
  );
};

export default Followers;
import '../../css/GallaryPreview.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
function GallaryPreview() {
  const [arts, setArts] = useState([]);

  useEffect(() => {

    const fetchArts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/arts/preview");
        setArts(response.data);
        console.log(response.data);
        }
       catch (error) {
        console.log("Error fetching user arts", error.response?.data || error.message);
      }
    };
      fetchArts();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="gallerypreview">
      <h2>
        Gallery
      </h2>
      <div className="gallerypreview-grid">
        {arts.map(art => (
          <div key={art.id} className="gallerypreview-item">
            <img src={art.photo} alt={art.artname} />
            <p>{art.artname}</p>
          </div>
        ))}
        <div className='viewmore'>
            <Link to="/gallery" className='nav-link'>View more<span className="new-line">Arts</span></Link>
            </div>
      </div>
    </div>
  );
}

export default GallaryPreview;

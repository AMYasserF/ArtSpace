import '../../css/GallaryPreview.css';
import { Link } from 'react-router-dom';

function GallaryPreview() {
  const arts = [
    { id: 1, title: "Sunset Glow", image: "./src/assets/testImages/download.jpg" },
    { id: 2, title: "Ocean Depths", image: "./src/assets/testImages/download (1).jpg" },
    { id: 3, title: "Forest Whispers", image: "./src/assets/testImages/images.jpg" },
  ];

  return (
    <div className="gallerypreview">
      <h2>
        Gallery
      </h2>
      <div className="gallerypreview-grid">
        {arts.map(art => (
          <div key={art.id} className="gallerypreview-item">
            <img src={art.image} alt={art.title} />
            <p>{art.title}</p>
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

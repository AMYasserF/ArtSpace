import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-2">
      <div className="container">
        <div className="row">
          <div className="col">
            <h3 className="h5">ArtSpace</h3>
            <ul className="list-unstyled">
              <li><a href="#about" className="text-white text-decoration-none">About Us</a></li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <p className="mb-0">© 2024 ArtSpace. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
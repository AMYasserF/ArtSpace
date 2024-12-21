import React, { useEffect, useState } from 'react';
import axios from 'axios';
const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/api/Feedback').then((response) => {
      setTestimonials(response.data);
      console.log(response.data);
    }).catch((err) => {
      console.error('Error fetching testimonials', err);
    });
  }, []);

  return (
    <section className="testimonials">
      <h2 className="testimonials-title">What People Say About ArtSpace</h2>
      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <p className="testimonial-text">"{testimonial.description}"</p>
            <h3 className="testimonial-name">{testimonial.name}</h3>
            <p className="testimonial-role">{testimonial.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;

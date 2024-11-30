import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "ArtSpace transformed the way I showcase my artwork. The platform is intuitive and visually stunning!",
      name: "John Doe",
      role: "Artist",
    },
    {
      text: "I discovered so many amazing artists on ArtSpace. The auction feature is seamless and exciting!",
      name: "Jane Smith",
      role: "Collector",
    },
    {
      text: "As a gallery owner, ArtSpace has allowed me to connect with a global audience like never before.",
      name: "Emily Lee",
      role: "Gallery Owner",
    },
  ];

  return (
    <section className="testimonials">
      <h2 className="testimonials-title">What People Say About ArtSpace</h2>
      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <p className="testimonial-text">"{testimonial.text}"</p>
            <h3 className="testimonial-name">{testimonial.name}</h3>
            <p className="testimonial-role">{testimonial.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;

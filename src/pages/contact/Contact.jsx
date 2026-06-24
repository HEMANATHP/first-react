import React, { useState } from "react";
import { toast } from "react-toastify";
import "./contact.css";
import usecontactstore from "../../store/contactstore";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const allForm = usecontactstore((state) => state.allForm);
  const addToForm = usecontactstore((state) => state.addToForm);

  const nameregex = /^[a-zA-z\s]{3,30}$/;
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!nameregex.test(formData.name)) {
      toast.error("enter a valid name");
      return;
    }
    if (!emailregex.test(formData.email)) {
      toast.error("enter a valid email");
      return;
    }
    if (formData.subject.trim() === "") {
      toast.error("subject should not be empty");
      return;
    }
    if (formData.message.trim().length < 10) {
      toast.error("message should be more than 10 word  ");
      return;
    }
    addToForm(formData);
    console.log(formData);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you. Reach out for any questions about our
          furniture collections.
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Get In Touch</h2>

          <div className="info-box">
            <i className="fa-solid fa-location-dot"></i>
            <div>
              <h4>Address</h4>
              <p>123 Furniture Street, Chennai, India</p>
            </div>
          </div>

          <div className="info-box">
            <i className="fa-solid fa-phone"></i>
            <div>
              <h4>Phone</h4>
              <p>+91 7708463548</p>
            </div>
          </div>

          <div className="info-box">
            <i className="fa-solid fa-envelope"></i>
            <div>
              <h4>Email</h4>
              <p>support@addina.com</p>
            </div>
          </div>

          <div className="info-box">
            <i className="fa-solid fa-clock"></i>
            <div>
              <h4>Working Hours</h4>
              <p>Mon - Sat : 9:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>

        <form className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handlechange}
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handlechange}
            placeholder="Your Email"
            required
          />
          <input
            type="text"
            value={formData.subject}
            onChange={handlechange}
            name="subject"
            placeholder="Subject"
          />

          <textarea
            rows="6"
            value={formData.message}
            onChange={handlechange}
            placeholder="Write your message..."
            name="message"
            required
          ></textarea>

          <button type="submit" onClick={(e) => handlesubmit(e)}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

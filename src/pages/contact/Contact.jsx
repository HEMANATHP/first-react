
  import { toast } from "react-toastify";
  import "./contact.css";
  import usecontactstore from "../../store/contactstore";
  import {z} from "zod";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";

  const contactSchema = z.object({
    name:z.string().min(3,"name sholud be atleast 3 character"),
    email:z.string().email("enter a valid email"),
    subject:z.string(),
    message:z.string().min(3,"message should contain atleast 10 character")
  })
  const Contact = () => {
    
    const addToForm = usecontactstore((state) => state.addToForm);
    const {
      register,
      handleSubmit,
      reset,
      formState:{errors},
    } = useForm({resolver:zodResolver(contactSchema)})

    // const allForm = usecontactstore((state) => state.allForm);

    const onsubmit = (data)=>{
      console.log(data);
      addToForm(data);

      toast.success("form added successfully")
      console.log(usecontactstore.getState())
      reset()
    }
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

          <form className="contact-form"
          onSubmit={handleSubmit(onsubmit)}>
            <input
              type="text"
              placeholder="Your Name"
              {...register("name")}
            />
            {
              errors.name && (<p className="errorindicator">{errors.name.message}</p>)
            }
            <input
              type="email"
              placeholder="Your Email"
              {...register("email")}
            />
            {
              errors.email && (<p className="errorindicator">{errors.email.message}</p>)
            }
            <input
              type="text"
              placeholder="Subject"
              {...register("subject")}
            />
            {
              errors.subject && (<p className="errorindicator">{errors.subject.message}</p>)
            }

            <textarea
              rows="6"
              placeholder="Write you message..."
              {...register("message")}
            ></textarea>
            {errors.message && (<p className="errorindicator">{errors.message.message}</p>)}

            <button type="submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    );
  };

  export default Contact;

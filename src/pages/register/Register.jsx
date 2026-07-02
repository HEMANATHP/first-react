import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
  name: z.string().min(3, "Name should be atleast 3 character"),
  email: z.string().email("Enter a vaild email"),
  password: z.string().min(6, "Password should be atleast 6 character"),
  confirmpassword: z.string().min(6, "Password must be atleast 6 character"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onsubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <div id="register-outer">
      <div id="register-card">
        <h1>Create Account</h1>
        <p>Register to get started</p>

        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register("name")}
            />
            {errors.name && (
              <p className="error-indicator">{errors.name.message}</p>
            )}
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="error-indicator">{errors.email.message}</p>
            )}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              {...register("password")}
            />
            {errors.password && (<p className="error-indicator">{errors.password.message}</p>)}

          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password"
            {...register("confirmpassword")} />
            {errors.confirmpassword && (<p className="error-indicator">{errors.confirmpassword.message}</p>)}

          </div>

          <div className="button-group">
            <button type="button"
            onClick={()=>reset()} className="clear-btn">
              Clear
            </button>

            <button type="submit" className="register-btn">
              Register
            </button>
          </div>

          <p className="login-link">
            Already have an account?
            <Link to={"/login"}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

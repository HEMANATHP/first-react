import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import login from "../../services/AuthService";
import useLoginStore from "../../store/loginstore";


const loginSchema = z.object({
  username: z.string().min(3, "Enter a valid Email"),
  password: z.string().min(6, "Enter a valid password"),
});


const Login = () => {
  const {setAuth}= useLoginStore();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onsubmit = async (data) => {

    console.log(data)
    try {
      const response = await login(data);
      console.log(response);
      setAuth(response)
      toast.success("successfully Loged IN")
      navigate("/")
    } catch (error) {
      toast.error("invalid credentials")
    } finally {
      reset();
    }
  };

  return (
    <div id="login-outer">
      <div id="login-card">
        <h1>Welcome Back</h1>
        <p>Sign in to continue</p>

        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="input-group">
            <label>Username(Email)</label>
            <input
              type="text"
              placeholder="Enter your Email"
              {...register("username")}
            />

            {errors.username && (
              <p className="error-indicator">{errors.username.message}</p>
            )}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />

            {errors.password && (
              <p className="error-indicator">{errors.password.message}</p>
            )}
          </div>

          <div className="button-group">
            <button type="reset" className="clear-btn">
              Clear
            </button>

            <button type="submit" className="login-btn">
              Login
            </button>
          </div>

          <p className="register-link">
            Don't have an account?
            <Link to={"/register"}>Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

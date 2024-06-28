import { useForm } from "react-hook-form";
import { userLogin } from "../api/users";
import { NavLink, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [auth, setAuth] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await userLogin(data);
      console.log(data);

      localStorage.setItem("username", res.data.user.username);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.user.id);
      localStorage.setItem("img", res.data.user.image);

      setAuth(true);
    } catch (err) {
      setLoginError("The username or password is incorrect");
    }
  });

  useEffect(() => {}, [auth]);

  return (
    <>
      <div className="login-container">
        <h1>T</h1>
        <form id="form-login" onSubmit={onSubmit}>
          {loginError && <p className="login-error">{loginError}</p>}
          <input
            className="login-username"
            placeholder="Username"
            type="text"
            {...register("username", { required: true })}
          />
          <input
            className="login-password"
            placeholder="password"
            type="password"
            {...register("password", { required: true })}
          />
          <button className="login-btn">Login</button>
          <NavLink className="login-register" to="/register">
            Register
          </NavLink>
        </form>
        {auth ? <Navigate to="/home" /> : null}
      </div>
    </>
  );
};

export default Login;

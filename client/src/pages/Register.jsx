import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { userLogin, userRegister } from "../api/users";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const [auth, setAuth] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    const res = await userRegister(data);

    const res2 = await userLogin(data);

    localStorage.setItem("username", res2.data.user.username);
    localStorage.setItem("token", res2.data.token);
    localStorage.setItem("id", res2.data.user.id);
    localStorage.setItem("img", res2.data.user.image);

    setAuth(true);
  });

  useEffect(() => {}, [auth]);

  return (
    <div className="register">
      <h2>T</h2>
      <form id="register-form" onSubmit={onSubmit}>
        <p className="register-p">
          Please enter a username and password to create your account
        </p>
        <input
          placeholder="username"
          className="register-username"
          type="text"
          {...register("username", { required: true })}
        />
        <input
          placeholder="password"
          className="register-password"
          type="password"
          {...register("password", { required: true })}
        />
        <button className="register-btn">Create Account</button>
      </form>
      {auth ? <Navigate to="/home" /> : null}
    </div>
  );
};

export default Register;

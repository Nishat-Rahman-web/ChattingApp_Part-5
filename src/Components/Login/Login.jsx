import React, { useState } from 'react';
import Lottie from "lottie-react";
import loginanimation from "../../../public/animation/loginanimation.json";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { GrUnlock } from "react-icons/gr";
import "./Login.css";
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // firebase variables
  const auth = getAuth();

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Please enter your email!");
    }
    if (!password) {
      setPasswordError("Please enter your password!");
    } 
    else {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        if(user.emailVerified == false){
          toast.error('Please verify your email!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
        }else{
          toast.success('You are logged in successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
     
    }
  };

  return (
    <>
      <div className='container'>
        <div className="w-full h-screen flex gap-16 items-center justify-center">
          <div className="animation">
            <Lottie animationData={loginanimation} />
          </div>
          <div className="mainform">
            <h1 className='loginHead'>Login Here</h1>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <MdOutlineEmail className="input-icon" />
                  <input 
                    onChange={handleEmail} 
                    type="email" 
                    id="email" 
                    placeholder='Enter email' 
                    value={email}
                  />
                </div>
                <p className='error'>{emailError}</p>
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <input 
                    onChange={handlePassword}
                    type={showPass ? "text" : "password"} 
                    id="password" 
                    placeholder='Enter password' 
                    value={password}
                  />
                  {showPass ? (
                    <GrUnlock onClick={handleShowPass} className="input-icon show" />
                  ) : (
                    <RiLockPasswordLine onClick={handleShowPass} className="input-icon show" />
                  )}
                </div>
                <p className='error'>{passwordError}</p>
              </div>
              <div className='text flex items-center gap-10'>
                <div className='flex items-center gap-2'>
                  <input type="checkbox" />
                  <p>Remember me</p>
                </div>
                <Link to="/forgotPassword">Forgot Password?</Link>
              </div>
              <button className='loginbtn' type="submit">LogIn</button>
              <div className="register-link">
                <p>Don't have an account? <Link to="/register">Register</Link></p>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;

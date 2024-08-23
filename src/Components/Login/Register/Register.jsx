// import React, { useState } from 'react';
import Lottie from "lottie-react";
import registerAnimation from "../../../../public/animation/registration.json";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { GrUnlock } from "react-icons/gr";
import "./Register.css";
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";

import { useState, CSSProperties } from "react";
import { PropagateLoader } from "react-spinners";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleShowPass = () => setShowPass(!showPass);
  const handleShowConfirmPass = () => setShowConfirmPass(!showConfirmPass);

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate()
 
  // ================firebase variables===============
  const auth = getAuth();
  const [loading, setLoading] = useState(false)

  const handleUsername = (e) => {
    setUsername(e.target.value);
    setUsernameError('');
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      setUsernameError("Please enter your username!");
    }if (!email) {
      setEmailError("Please enter your email!");
    }if (!password) {
      setPasswordError("Please enter your password!");
    }
     else if (!confirmPassword) {
      setConfirmPasswordError("Please enter your confirm password!");
    }
     else {
      if(password != confirmPassword){
        toast.error('Passwords do not match!', {
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
      else{
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser) 
          // update user name and profile picture
          updateProfile(auth.currentUser, {
            displayName: username, 
            photoURL: "https://photosking.net/wp-content/uploads/2024/05/sad-girl-profile-pictures_30.webp"
          });
          
          // loader part
          setLoading(false)
          // toast message
          toast.success('Thank you! Your account has been successfully registered but you must verify your email before logging in.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          onClose: () => navigate('/')
        });
        // email verification 
         
        })
        .catch((error) => {
          const errorCode = error.code;
          setLoading(false)
          if(errorCode == "auth/email-already-in-use"){
            toast.error('Email already exists!', {
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
          if(errorCode == "auth/weak-password"){
            toast.error('Password should be at least 6 characters.', {
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
        });
      }
     
    }
  };

  return (
    <>
      <div className='container'>
        <div className="w-full h-screen flex gap-16 items-center justify-center">
          <div className="animation">
            <Lottie animationData={registerAnimation} />
          </div>
          <div className="mainform">
            <h1 className='loginHead'>Registration</h1>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <div className="input-wrapper">
                  <FaRegUser className="input-icon" />
                  <input 
                    onChange={handleUsername} 
                    type="text" 
                    id="username" 
                    placeholder='Enter username' 
                    value={username}
                  />
                </div>
                <p className='error'>{usernameError}</p>
              </div>
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
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <input 
                    onChange={handleConfirmPassword}
                    type={showConfirmPass ? "text" : "password"} 
                    id="confirmPassword" 
                    placeholder='Confirm password' 
                    value={confirmPassword}
                  />
                  {showConfirmPass ? (
                    <GrUnlock onClick={handleShowConfirmPass} className="input-icon show" />
                  ) : (
                    <RiLockPasswordLine onClick={handleShowConfirmPass} className="input-icon show" />
                  )}
                </div>
                <p className='error'>{confirmPasswordError}</p>
              </div>

              {
                loading?(
                <div className="loader">
                  <PropagateLoader color="#800c5a"/>
                </div>)
                :(
                  <button className='registerbtn' type="submit">Register</button>
                )
              }
             
              <div className="login-link">
                <p>Already have an account? <Link to="/">Log In</Link></p>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Register;

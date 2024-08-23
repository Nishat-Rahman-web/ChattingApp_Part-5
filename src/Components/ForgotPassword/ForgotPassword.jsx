import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgetPass = () => {
  const [Email, setEmail] = useState('');
  const [emailerr, setEmailerr] = useState('');

  const navigate = useNavigate();
  const auth = getAuth();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Email) {
      setEmailerr('Please enter your email!');
    } else {
      sendPasswordResetEmail(auth, Email)
        .then(() => {
          alert('The email has been sent to your email address.');
          navigate('/');
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.error('Error sending password reset email:', errorMessage);
          setEmailerr(errorMessage);
        });
    }
  };

  return (
    <div className="forget-pass-container">
      <div className="forget-pass-box">
        <h2 className="forget-pass-title">Reset Password</h2>
        <form onSubmit={handleSubmit} className="forget-pass-form">
          <div className="forget-pass-input-group">
            <label htmlFor="email" className="forget-pass-label">
              Email address
            </label>
            <input
              onChange={handleEmail}
              id="email"
              type="email"
              className="forget-pass-input"
              placeholder="Enter your email"
            />
            <p className="forget-pass-error">{emailerr}</p>
          </div>
          <button
            type="submit"
            className="forget-pass-button"
          >
            Reset Password
          </button>
        </form>
        <Link
          to="/"
          className="forget-pass-back-button"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default ForgetPass;

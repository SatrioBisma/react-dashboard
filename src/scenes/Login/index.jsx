import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../Login/login.css'
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const Login = ({ setIsLoggedIn }) => {
  const [action, setaction] = useState('');
  const navigate = useNavigate(); // Ambil objek history dari react-router-dom

  const registerLink = () => {
    setaction(' active');
  }

  const loginLink = () => {
    setaction('');
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('http://109.123.235.25:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
      const response = await fetch('http://109.123.235.25:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.message === 'Login berhasil') {
        setIsLoggedIn(true);
        navigate('/dashboard'); // Arahkan ke /table pada keberhasilan
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="body-login">
    <div className={`wrapper${action}`}>
      <div className="form-box login">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder='Username' name="username" required />
            <FaUser className='icon' />
          </div>
          <div className="input-box">
            <input type="password" placeholder='Password' name="password" required />
            <FaLock className='icon' />
          </div>
          <div className="remember-forgot">
            <label>
              <input type='checkbox' /> Remember me
            </label>
            <a href=''>Forgot Password?</a>
          </div>
          <button type="submit"> Login</button>
          <div className="register-link">
            <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
          </div>
        </form>
      </div>
      <div className="form-box register">
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          <div className="input-box">
            <input type="text" placeholder='Username' name="username" required />
            <FaUser className='icon' />
          </div>
          <div className="input-box">
            <input type="email" placeholder='Email' name="email" required />
            <FaEnvelope className='icon' />
          </div>
          <div className="input-box">
            <input type="password" placeholder='Password' name="password" required />
            <FaLock className='icon' />
          </div>
          <button type="submit"> Register</button>
          <div className="register-link">
            <p>Already have an account <a href='' onClick={loginLink}>Login</a></p>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;

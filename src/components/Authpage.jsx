// src/pages/AuthPage.jsx
import { useState } from 'react';
import Login from '../components/login';
import Register from '../components/Register';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async (formData) => {
    console.log("Login data", formData);
    // TODO: Connect to backend API
  };

  const handleRegister = async (formData) => {
    console.log("Register data", formData);
    // TODO: Connect to backend API
  };

  return (
    <div className="auth-container">
      {isLogin ? <Login onLogin={handleLogin} /> : <Register onRegister={handleRegister} />}
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default AuthPage;

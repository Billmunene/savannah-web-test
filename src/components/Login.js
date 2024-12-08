// src/components/Login.js
import React from 'react';

const Login = ({ handleLogin }) => {
  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;

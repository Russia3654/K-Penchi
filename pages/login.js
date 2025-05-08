import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter for navigation

const Login = () => {
  const { setIsAuthenticated } = useAuth(); // Get setIsAuthenticated from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize the router

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Simulate authentication
      if (email === 'admin@shop.com' && password === 'admin') {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true'); // Store authentication state in local storage
        router.push('/'); // Redirect to the home page
      } else {
        setIsAuthenticated(false);
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed: ', error);
    }
  };

  return (
    <div className='loginContainer'>
      <h1>Login</h1>
      <h2>Don't have an account? <Link href="/signup">Create Account</Link></h2>
      <form onSubmit={handleLogin} className='loginForm'>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div>
        <Link href="/recover-password">Forgot Password?</Link> {/* Link to password recovery page */}
      </div>
      {error &&
        <p style={{color:'red'}}>{error}</p>
      }
    </div>
  );
};

export default Login;

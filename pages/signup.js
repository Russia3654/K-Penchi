import Link from 'next/link';
import React, { useState } from 'react';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Simulate sign-up logic
    console.log('Sign-up successful for:', email);
  };

  return (
    <div>
      <h2>Create Account</h2>
      <div>
        Already have an account?
        <Link href='./login'>Log In</Link>
      </div>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={LastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
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
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>} {/* Display error message */}
      <Link href='/'>go back to store</Link>
    </div>
  );
};

export default SignUp;

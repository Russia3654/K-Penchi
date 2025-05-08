import React, { useState } from 'react';

const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRecover = (e) => {
    e.preventDefault();
    // Simulate password recovery logic
    setMessage(`Recovery email sent to: ${email}`);
  };

  return (
    <div>
      <h2>Recover Password</h2>
      <form onSubmit={handleRecover}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Recovery Email</button>
      </form>
      {message && <p>{message}</p>} {/* Display success message */}
    </div>
  );
};

export default RecoverPassword;

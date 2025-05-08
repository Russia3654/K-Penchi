import React from 'react';

const CustomerInfoForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h3>Customer Info</h3>
      <div>
        <h4>Contacts:</h4>
        <div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            /></div>
        </div>
      </div>
      <div>
        <h4>Delivery Information:</h4>
        <div>
          <label>Shipping Address:</label>
          <input
            type='text'
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Payment Method:</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="onDelivery">On Delivery</option>
          </select>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button type="submit">Place Order</button>
      </div>
    </form>
  );
};

export default CustomerInfoForm;

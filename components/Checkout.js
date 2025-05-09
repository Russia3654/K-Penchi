import React, { useState, useEffect } from 'react';
import { checkCustomerExists, createCustomer } from '../pages/api/customer/customers';
import CustomerInfoForm from './CustomerInfoForm';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import OrderSummary from './OrderSummary';
import { createInvoice } from '../pages/api/finance/invoices';

const Checkout = () => {
  const cartItems = useSelector(state => state.cart);
  const shippingCost = 5.00;
  const subtotal = cartItems.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
  const total = subtotal + shippingCost;
  const cost = [shippingCost, subtotal, total];

  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    paymentMethod: 'onDelivery'
  });

  useEffect(() => {
    const isCartEmpty = cartItems.length === 0;

    if (isCartEmpty) {
      router.push('/');
    }
  }, [cartItems, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingCustomerId = await checkCustomerExists(formData.email);
    if (!existingCustomerId) {
      await createCustomer(formData); // Create a new customer if they do not exist
    }
    await createInvoice(formData, cartItems, cost); // Create an invoice with customer data and cart items

    // Send email via backend server HTTP POST request
    try {
      const response = await fetch('/api/sendOrderConfirmationEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer: formData,
          cartItems: cartItems,
          cost: cost
        })
      });
      if (!response.ok) {
        throw new Error('Failed to send order confirmation email');
      }
      console.log('Order confirmation email sent');
      router.push('/');
    } catch (error) {
      console.error('Error sending order confirmation email:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  return (
    <div style={{display: 'flex'}}>
      <CustomerInfoForm 
        formData={formData} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
      />
      <OrderSummary cartItems={cartItems} />
    </div>
  );
};

export default Checkout;

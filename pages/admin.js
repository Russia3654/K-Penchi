import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

import FinaceManager from "../components/FinaceManager";
import TPManager from "../components/TPManager";
import CPManager from "../components/CPManager";
import Button from "../components/ui/Button/Button";

const AdminPanel = () => {
  const { isAuthenticated } = useAuth(); // Get authentication status
  const router = useRouter(); // Initialize router

  useEffect(() => {
    console.log('Admin Page Authenticated:', isAuthenticated); // Debugging line
    const checkAuth = () => {
      if (!isAuthenticated) {
        console.log('Redirecting to login...'); // Debugging line
        router.push('/login'); // Redirect to login if not authenticated
      } else {
        console.log('User is authenticated, staying on admin page.'); // Debugging line
        router.push('/admin');
      }
    };
    checkAuth();
  }, [isAuthenticated]); // Added isAuthenticated as a dependency

  const [isProduct, setProduct] = useState(false);
  const [isPicture, setPicture] = useState(false);
  const [isCustom, setCustom] = useState(false);
  const [isRate, setRate] = useState(false);

  const handelProduct = () => {
    setProduct(true);
    setPicture(false);
    setCustom(false);
    setRate(false);
  }
  const handelPicture = () => {
    setProduct(false);
    setPicture(true);
    setCustom(false);
    setRate(false);
  }
  const handelCustom = () => {
    setProduct(false);
    setPicture(false);
    setCustom(true);
    setRate(false);
  }
  const handelRate = () => {
    setProduct(false);
    setPicture(false);
    setCustom(false);
    setRate(true);
  }

  return (
    <div style={{padding: "60px 20px 20px 20px" }}>
      <h2>Admin Panel</h2> 

      <p>Manage your products here.</p>
      <div>
        <Button onClick={handelProduct}>Manage Product</Button>
        <Button onClick={handelPicture}>Manage Picture</Button>
        <Button onClick={handelCustom}>Manage Custom</Button>
        <Button onClick={handelRate}>Manage Finace</Button>
      </div>
      <div>
      {isProduct &&
        <CPManager />
      }
      {isPicture &&
        <TPManager />
      }
      {isCustom &&
        <div>hello</div>
      }
      {isRate &&
        <FinaceManager />
      }
      </div>
    </div>
  );
};

export default AdminPanel;
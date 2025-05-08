import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import { db } from '../store/firebase';
import { collection, getDocs } from 'firebase/firestore';
import '../styles/global.css';
import "../styles/productItem.css"; 
import '../styles/Picture.css';
import "../styles/productList.css";
import "../styles/home.css";
import '../styles/ComingSoon.css';
import '../styles/productDetail.css';

import Navbar from '../components/ui/Navbar/Navbar';
import Footer from '../components/ui/Footer/Footer';
import { AuthProvider } from '../context/AuthContext'; 

const MyApp = ({ Component, pageProps }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}>
          <Navbar products={products} />
          <main style={{ flex: 1 }}>
            <Component {...pageProps} products={products} />
          </main>
          <Footer/>
        </div>
      </AuthProvider>
    </Provider>
  );
};

export default MyApp;

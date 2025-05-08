import React, { useEffect, useState } from 'react';
import ImageCarousel from '../components/ImageCarousel';
import ProductDetail from '../components/ProductDetail';
import { getProducts } from '../api/products';
import { getPictures } from '../api/pictures';
import Link from 'next/link';
import Loader from '../components/ui/Loader/Loader';
import Info from '../components/Info';
import ComingSoon from '../components/ComingSoon';
import ProductCarousel from '../components/Carousel';
import { getTextures } from '../api/textures';

const Index = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [thumbnails, setThumbnails] = useState([]);
  const [texture, setTexture] = useState([]);

  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        const pictures = await getPictures();
        const thumbnailPictures = pictures.filter(pic => pic.url.includes('thumbnail'));
        setThumbnails(thumbnailPictures);
      } catch (error) {
        console.error('Error fetching thumbnails:', error);
      }
    };
    fetchThumbnails();
  }, []);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        const textureList = await getTextures();
        setTexture(textureList);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="first-div">
        <ImageCarousel pictures={thumbnails} location="thumbnail" text={{title:"hello word", body:"hi"}}/>
      </div>

      <div className='second-div'>
        {loading ? (
          <Loader text={"Loading"}/>
        ) : (
          <div className='product-container'>
            <ProductCarousel products={products} texture={texture} />
            <div className='container-link'>
              <Link href="/products">
                View More Products
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className='third-div'>
        <ProductCarousel type="info" products={products}/>
      </div>
      <div className='fourth-div'>
        <ComingSoon imageSrc="/image/img1.png" />
      </div>
    </div>
  );
}

export default Index;

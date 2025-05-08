import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cart from "../../Cart";
import Search from "../../Search";
import { useAuth } from "../../../context/AuthContext";
import Modal from "../Modals/Modal";
import { useRouter } from "next/router";
import { useSelector } from "react-redux"; // Import useSelector
import Button from "../Button/Button";
import cl from "./Navbar.module.css";
import AnimatedLink from "../AnimatedLink/AnimatedLink";

const Navbar = ({ products }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [isCartVisible, setCartVisible] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const cartItems = useSelector((state) => state.cart);
  const uniqueItemCount = cartItems.length;
  let NavLinkClasses = [cl.nav_links];
  let NavClasses = [cl.navbar];

  useEffect(() => {
    const handleScroll = () => {
      const firstDiv = document.querySelector(".first-div");
      if (firstDiv) {
        const firstDivHeight = firstDiv.offsetHeight - 60;
        if (window.scrollY > firstDivHeight) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/";
  };

  if (!isHomePage || isScrolled) {
    NavClasses.push(cl.scrolled);
  }

  if (isMenuOpen) {
    NavLinkClasses.push(cl.open);
  }

  return (
    <nav className={NavClasses.join(" ")}>
      <div className={cl.logo}>
        <Button className={cl.burger} onClick={() => setMenuOpen(true)}>
          ☰
        </Button>
        <Link href="/">
          <img src="/image/logo_1.png" />
        </Link>
      </div>
      <div className={NavLinkClasses.join(" ")}>
        <div className={cl.closeBtn}>
          <Button className={cl.burger} onClick={() => setMenuOpen(false)}>
            X
          </Button>
        </div>
        <div className={cl.nav_links_container}>
          <AnimatedLink
            path="/"
            text="Home"
            onClick={() => setMenuOpen(false)}
          />
          <AnimatedLink
            path="/products"
            text="Products"
            onClick={() => setMenuOpen(false)}
          />
          <AnimatedLink
            path="/custom"
            text="Custom"
            onClick={() => setMenuOpen(false)}
          />
          {isAuthenticated && (
            <AnimatedLink
              path="/admin"
              text="Admin"
              onClick={() => setMenuOpen(false)}
            />
          )}
        </div>
      </div>
      <div className={cl.nav_btns}>
        <Button onClick={() => setSearchVisible(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </Button>
        <Modal
          visible={isSearchVisible}
          setVisible={setSearchVisible}
          type="search"
        >
          <Search products={products} onClose={() => setSearchVisible(false)} />
        </Modal>

        {isAuthenticated && <Button onClick={handleLogout}>Logout</Button>}

        <Button onClick={() => setCartVisible(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bag"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
          </svg>
          {uniqueItemCount > 0 && (
            <span className="cart-count">{uniqueItemCount}</span>
          )}
        </Button>
        <Modal visible={isCartVisible} setVisible={setCartVisible} type="cart">
          <Cart onClose={() => setCartVisible(false)} />
        </Modal>
      </div>
    </nav>
  );
};

export default Navbar;

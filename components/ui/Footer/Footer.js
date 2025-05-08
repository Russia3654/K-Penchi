import React from "react";
import Link from "next/link";
import cl from "./Footer.module.css";
import Select from "../Select/Select"; // Importing the Select component
import { useRouter } from "next/router";
import AnimatedLink from "../AnimatedLink/AnimatedLink"

const Footer = ({ hideFooter }) => {
  const router = useRouter();
  const isAdminPage = router.pathname === "/admin";

  if (hideFooter || isAdminPage) {
    return null;
  }

  return (
    <div className={cl.footer}>
      <div className={cl.footerTopSection}>
        <div className={cl.footerTitle}>
          Lorem ipsum odor amet, consectetuer adipiscing elit.
        </div>
        <div className={cl.footerLinks}>
          <AnimatedLink path="/" text="Home"/>
          <AnimatedLink path="/products" text="Product"/>
          <AnimatedLink path="/custom" text="Custom"/>
        </div>
      </div>

      <div className={cl.footerBottomSection}>
        <div className={cl.footerColumn}>
          <div>
            <img
              width="60"
              height="60"
              src="https://img.icons8.com/ios-glyphs/60/instagram-circle.png"
              alt="instagram-circle"
            />
          </div>
          <div>copyright</div>
        </div>
        <div className="footer-column">
          <Select
            value={undefined}
            onChange={undefined}
            defaultValue="feature"
            options={[
              { value: "USD", name: "USD" },
              { value: "LBP", name: "LBP" },
            ]}
          />
          {/* partner icon section */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

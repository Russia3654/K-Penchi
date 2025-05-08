import React from 'react';
import styles from './Button.module.css';

const Button = ({children, location, ...props }) => {

  if (location === "carousel") {
    return (
      <button className={styles.carouselButton} {...props}>
        {children}
      </button>
    );
  }
  if (location === "sorting") {
    return (
      <button className={styles.sortingButton} {...props}>
        {children}
      </button>
    );
  }
  if (location === "element"){
    return (
      <button className={styles.elementButton} {...props}>
        {children}
      </button>
    );
  }

  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}

export default Button;

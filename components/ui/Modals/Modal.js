import React from 'react';
import cl from './Modals.module.css';

const Modal = ({ children, visible, setVisible, type }) => {
  let rootClasses = [];
  let contentClass;

  switch (type) {
    case "cart":
      rootClasses = [cl.myModal];
      contentClass = cl.myCartContent;
      break;
      
    case "picture":
      rootClasses = [cl.myPictureModal];
      contentClass = cl.myPictureContent;
      break;

    case "search":
      rootClasses = [cl.myModal];
      contentClass = cl.mySearchContent;
      break;

    case "productForm":
      rootClasses = [cl.myPictureModal];
      contentClass = cl.myPictureContent;
      break;

    default:
      break;
  }

  if (visible) {
    rootClasses.push(cl.active);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={contentClass} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;

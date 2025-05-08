import React from 'react';
import cl from './Tag.module.css';
import Button from '../Button/Button';

const Tag = ({ object, remove, update }) => {
  const handleClick = (e, action) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  return (
    <div className={cl.tagBody}>
      <div className={cl.tagText}>{object}</div>
      <div>
        <Button type="button" onClick={(e) => handleClick(e, update)}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24"
            style={{ fill: '#FFFFFF' }}>
            <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z"></path>
          </svg>
        </Button>
        <Button type="button" onClick={(e) => handleClick(e, remove)}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24"
            style={{ fill: '#FFFFFF' }}>
            <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z"></path>
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default Tag;

import React from 'react';
import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ webformatURL, id, tags, onClick }) {
  return (
    <li key={id} className={s.galleryItem} onClick={onClick}>
      <img src={webformatURL} alt={tags} id={id} className={s.galleryImg} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

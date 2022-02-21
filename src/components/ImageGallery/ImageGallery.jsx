import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import s from './ImageGallery.module.css';

function ImageGallery({ gallery, onOpen }) {
  return (
    <>
      <ul className={s.gallery}>
        {gallery.map(({ webformatURL, id, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            onClick={onOpen}
          />
        ))}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default ImageGallery;

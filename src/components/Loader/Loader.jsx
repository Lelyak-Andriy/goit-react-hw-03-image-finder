import React from 'react';
import s from './Loader.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Audio } from 'react-loader-spinner';

function Loader() {
  return (
    <div className={s.loader}>
      <Audio heigth="100" width="100" color="blue" ariaLabel="loading" />
    </div>
  );
}

export default Loader;

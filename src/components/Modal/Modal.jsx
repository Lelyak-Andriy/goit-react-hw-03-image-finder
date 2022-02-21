import { createPortal } from 'react-dom';
import { Component } from 'react';
import s from '../Modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropclick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.overlay} onClick={this.handleBackdropclick}>
        <div className={s.modal}>{this.props.children}</div>
        <button
          className={s.btnCloseModal}
          type="button"
          onClick={this.props.onClose}
        >
          x
        </button>
      </div>,
      modalRoot
    );
  }
}
export default Modal;

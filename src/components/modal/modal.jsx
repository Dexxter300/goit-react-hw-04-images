import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ img, onClose }) => {
  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.hendleKeyDown);
  // }

  const hendleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log(e.code);
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', hendleKeyDown);

    return () => {
      window.removeEventListener('keydown', hendleKeyDown);
    };
  });

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img className={css.img} src={img.largeImageURL} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

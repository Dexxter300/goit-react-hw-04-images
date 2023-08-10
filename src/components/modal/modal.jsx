import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ img, onClose }) => {
  //   static defaultProps = {
  //     img: {
  //       largeImageURL:
  //         'https://pixabay.com/get/g9453aa195c07bc56268891e4851ed3e51098d17674c0e9277d44c35fde7174acf83971f02dd6b5d09ce48a119ecd992ee910fe4d81f6f2a1bbb3d4f126c755a2_1280.jpg',
  //     },
  //   };
  useEffect(() => {
    window.addEventListener('keydown', hendleKeyDown);

    return () => {
      window.removeEventListener('keydown', hendleKeyDown);
    };
  }, []);

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

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img className={css.img} src={img.largeImageURL} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  //   static defaultProps = {
  //     img: {
  //       largeImageURL:
  //         'https://pixabay.com/get/g9453aa195c07bc56268891e4851ed3e51098d17674c0e9277d44c35fde7174acf83971f02dd6b5d09ce48a119ecd992ee910fe4d81f6f2a1bbb3d4f126c755a2_1280.jpg',
  //     },
  //   };
  componentDidMount() {
    window.addEventListener('keydown', this.hendleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleKeyDown);
  }

  hendleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log(e.code);
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.backdrop} onClick={this.handleBackdropClick}>
        <div className={css.modal}>
          <img className={css.img} src={this.props.img.largeImageURL} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

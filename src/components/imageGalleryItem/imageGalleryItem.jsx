import css from './imageGalleryItem.module.css';

export const ImageGalleryItem = ({ img, onOpen }) => {
  return (
    <li onClick={() => onOpen(img)}>
      <img className={css.img} src={img.previewURL} alt={img.tags} />
    </li>
  );
};

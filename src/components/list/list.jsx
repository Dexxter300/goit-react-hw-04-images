import { ImageGalleryItem } from 'components/imageGalleryItem/imageGalleryItem';
import css from './list.module.css';

export const List = ({ imgs, onOpen }) => {
  return (
    <ul className={css.list}>
      {imgs.map(img => {
        return (
          <ImageGalleryItem
            key={img.id}
            img={img}
            onOpen={onOpen}
          ></ImageGalleryItem>
        );
      })}
    </ul>
  );
};

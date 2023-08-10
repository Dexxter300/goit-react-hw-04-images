import css from './button.module.css';

export const Button = ({ loadMore }) => {
  // const handleClick = () => {

  // }
  return (
    <div className={css.div}>
      <button className={css.btn} type="button" onClick={loadMore}>
        Load more
      </button>
    </div>
  );
};

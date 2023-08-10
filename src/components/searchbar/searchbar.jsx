import React, { useState } from 'react';
import css from './searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  return (
    <header className={css.searchbar}>
      <form className="form" onSubmit={e => onSubmit(e, inputValue)}>
        <button type="submit" className={css.btn}>
          <span className="button-label">Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

import React, { Component } from 'react';
import css from './searchbar.module.css';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };
  handleChange = e => {
    this.setState({
      inputValue: e.target.value,
    });
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form
          className="form"
          onSubmit={e => this.props.onSubmit(e, this.state.inputValue)}
        >
          <button type="submit" className={css.btn}>
            <span className="button-label">Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

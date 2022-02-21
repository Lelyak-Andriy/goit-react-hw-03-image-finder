import { Component } from 'react';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    title: '',
  };

  handleTitleChange = e => {
    this.setState({ title: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title } = this.state;

    if (title.trim() === '') {
      Notify.warning('please enter a request');

      return;
    }
    this.props.onSubmit(title);

    this.setState({ title: '' });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />

          <button type="submit" className={s.button}>
            <span className={s.buttonLabel}>Search</span>
          </button>
        </form>
      </header>
    );
  }
}

export default Searchbar;

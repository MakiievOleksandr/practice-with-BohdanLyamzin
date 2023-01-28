import { Component } from 'react';
import { nanoid } from 'nanoid';

import styles from './my-books.module.scss';

class MyBooks extends Component {
  state = {
    items: [
      {
        id: nanoid(),
        title: 'Worm',
        author: 'John McRay',
      },
      {
        id: nanoid(),
        title: 'Girl genius',
        author: 'Foglio',
      },
    ],
    title: '',
    author: '',
    filter: '',
  };

  addBook = evt => {
    evt.preventDefault();
    const { title, author } = this.state;
    if (this.isDublicate(title, author)) {
      return alert(`${title}, ${author} is already exist`);
    }
    this.setState(prevState => {
      const { title, author, items } = prevState;

      const newBook = {
        id: nanoid(),
        title,
        author,
      };
      return { items: [newBook, ...items], title: '', author: '' };
    });
  };

  deleteBook(id) {
    this.setState(({ items }) => {
      const newBooks = items.filter(item => item.id !== id);
      return { items: newBooks };
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  isDublicate(title, author) {
    const normalizeTitle = title.toLowerCase();
    const normalizeAuthor = author.toLowerCase();
    const { items } = this.state;
    const book = items.find(({ title, author }) => {
      return (
        title.toLowerCase() === normalizeTitle &&
        author.toLowerCase() === normalizeAuthor
      );
    });
    return Boolean(book);
  }

  getFilteredBooks() {
    const { filter, items } = this.state;
    if (!filter) {
      return items;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = items.filter(({ title, author }) => {
      return (
        title.toLowerCase().includes(normalizedFilter) ||
        author.toLowerCase().includes(normalizedFilter)
      );
    });
    return result;
  }

  render() {
    const { addBook, handleChange } = this;
    const { title, author } = this.state;
    const items = this.getFilteredBooks();

    const books = items.map(({ title, author, id }) => (
      <li key={id}>
        {title}
        {'. '} {author}{' '}
        <button type="button" onClick={() => this.deleteBook(id)}>
          Delete
        </button>
      </li>
    ));

    return (
      <div>
        <h3>My Books</h3>
        <div className={styles.wrapper}>
          <div className={styles.block}>
            <h4>Add book</h4>
            <form onSubmit={addBook}>
              <div className={styles.formGroup}>
                <label htmlFor="">Book title</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="title"
                  value={title}
                  id=""
                  placeholder="Book title"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="">Book author</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="author"
                  value={author}
                  id=""
                  placeholder="Book author"
                />
              </div>
              <button type="submit">Add book</button>
            </form>
          </div>
          <div className={styles.block}>
            <div className={styles.formGroup}>
              <label htmlFor="">Filter</label>
              <input
                type="text"
                name="filter"
                id=""
                placeholder="Filter books"
                onChange={handleChange}
              />
            </div>
            <ol>{books}</ol>
          </div>
        </div>
      </div>
    );
  }
}

export default MyBooks;

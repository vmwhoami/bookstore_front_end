import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveBookToDb } from '../actions ';

const BooksForm = ({ saveBookToDb }) => {
  const categories = ['Action', 'Biography', 'History', 'Horror', 'Kids', 'Learning', 'Sci-Fi'];
  const [title, setTitle] = useState('');
  const [catValue, setCatValue] = useState('');

  const handleChange = e => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else {
      setCatValue(e.target.value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const obj = { title, category: catValue };
    if (title && catValue) {
      saveBookToDb(obj);
      setTitle('');
      setCatValue('');
    }
  };

  return (
    <div className="addbookform">
      <h2>ADD NEW BOOK</h2>
      <form onSubmit={handleSubmit} name="form" className="form">
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Book Title"
          onChange={e => handleChange(e)}
          value={title}
          className="input_box"
        />
        <select className="category" onClick={e => handleChange(e)}>
          {categories.map(category => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
        <button type="submit" className="submit_button">Add Book</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  // addBook: obj => {
  //   dispatch(addBook(obj));
  // },
  saveBookToDb: obj => {
    dispatch(saveBookToDb(obj));
  },
});

BooksForm.propTypes = {
  // addBook: PropTypes.func.isRequired,
  saveBookToDb: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(BooksForm);

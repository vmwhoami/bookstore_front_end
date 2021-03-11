import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Book from '../components/Book';
import CategoryFilter from '../components/CategoryFilter';
import {
  changeFilter, fetchBooks, deleteBook,
} from '../actions ';

const BooksList = ({
  books, changeFilter, filter, fetchBooks, deleteBook,
}) => {
  useEffect(() => {
    fetchBooks();
  }, []);
  const handleFilterChange = str => {
    changeFilter(str);
  };
  let categories = books.map(book => book.category);
  categories = [...new Set(categories)];
  const handleRemoveBook = id => {
    deleteBook(id);
  };
  return (
    <>
      <CategoryFilter categories={categories} handleFilterChange={handleFilterChange} />
      <div className="bookContainer">
        {books.filter(book => {
          if (filter === 'All') {
            return book;
          }
          return book.category === filter;
        }).map(book => (
          <Book
            key={book.id}
            book={book}
            handleRemoveBook={handleRemoveBook}
          />
        ))}

      </div>
    </>
  );
};
BooksList.propTypes = {
  books: PropTypes.instanceOf(Array).isRequired,
  filter: PropTypes.instanceOf(Object).isRequired,
};
Book.propTypes = {
  book: PropTypes.instanceOf(Object).isRequired,
};
const mapStateToProps = state => ({
  books: state.books,
  filter: state.filter,
});

BooksList.propTypes = {
  // removeBook: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  fetchBooks: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  // removeBook: id => {
  //   dispatch(removeBook(id));
  // },
  changeFilter: category => {
    dispatch(changeFilter(category));
  },
  fetchBooks: () => {
    dispatch(fetchBooks());
  },
  deleteBook: id => {
    dispatch(deleteBook(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);

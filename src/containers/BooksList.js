import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Book from '../components/Book';
import CategoryFilter from '../components/CategoryFilter';
import { removeBook, changeFilter } from '../actions ';

const BooksList = ({
  books, removeBook, changeFilter, filter,
}) => {
  const handleFilterChange = str => {
    changeFilter(str);
  };
  let categories = books.map(book => book.category);
  categories = [...new Set(categories)];
  const handleRemoveBook = id => {
    removeBook(id);
  };
  return (
    <>
      <CategoryFilter categories={categories} handleFilterChange={handleFilterChange} />
      <table className="table">
        <tbody>
          <tr>

            <th>Id</th>
            <th>Category</th>
            <th>Title</th>

            <th>Remove</th>
          </tr>
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
        </tbody>
      </table>
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
  removeBook: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  removeBook: id => {
    dispatch(removeBook(id));
  },
  changeFilter: category => {
    dispatch(changeFilter(category));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);

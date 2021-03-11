import axios from 'axios';
import * as act from '../actionTypes';

const addBook = book => ({
  type: act.CREATE_BOOK,
  payload: {
    title: book.title,
    category: book.category,
  },
});

const removeBook = id => ({
  type: act.REMOVE_BOOK, id,
});

const changeFilter = category => ({
  type: act.CHANGE_FILTER,
  category,

});

const fetchBooksSuccess = books => ({
  type: act.FETCH_BOOKS_SUCCESS,
  payload: { books },
});

const deleteBookSuccess = id => ({
  type: act.DELETE_BOOK_SUCCESS, id,
});
const url = 'https://bookstoreapiakata.herokuapp.com/books';

const saveBookToDb = obj => async dispatch => {
  axios.post(url, {
    books: obj,
  }).then(() => dispatch(addBook(obj)));
};

const fetchBooks = () => async dispatch => {
  try {
    const books = await axios.get(url);
    return dispatch(fetchBooksSuccess(books.data));
  } catch (e) {
    return e;
  }
};

const deleteBook = id => async dispatch => {
  try {
    return axios.delete(`${url}/${id}`)
      .then(() => {
        dispatch(deleteBookSuccess(id));
      });
  } catch (e) {
    return e;
  }
};

export {
  addBook, removeBook, changeFilter, saveBookToDb, fetchBooks, deleteBook,
};

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

// import { createStore, combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import noteReducer, { setNotes } from './reducers/noteReducer';
import filterReducer from './reducers/filterReducer';
import noteService from './services/note';

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
});

noteService.getAll().then((notes) => store.dispatch(setNotes(notes)));

console.log(store.getState());

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);

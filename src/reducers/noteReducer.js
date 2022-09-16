import { createSlice } from '@reduxjs/toolkit';
import noteService from '../services/notes';

// inital state
const initialState = [];

// const generateId = () => Number((Math.random() * 1000000).toFixed(0));
// slice
const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    appendNote(state, action) {
      state.push(action.payload);
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendNote, setNotes } = noteSlice.actions;

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content);
    dispatch(appendNote(newNote));
  };
};

export const toggleImportanceOf = (id) => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    const noteToChange = notes.find((n) => n.id === id);
    const changedNote = await noteService.updateNoteImportance(id, {
      ...noteToChange,
      important: !noteToChange.important,
    });
    const updatedNotes = notes.map((note) =>
      note.id !== id ? note : changedNote
    );
    dispatch(setNotes(updatedNotes));
  };
};

export default noteSlice.reducer;

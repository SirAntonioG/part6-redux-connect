import axios from 'axios';

const baseUrl = 'http://localhost:3001/notes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, important: false };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const updateNoteImportance = async (id, note) => {
  const response = await axios.put(`${baseUrl}/${id}`, note);
  return response.data;
};

const noteService = { getAll, createNew, updateNoteImportance };

export default noteService;

import axios from 'axios';
const apiurl = process.env.REACT_APP_API_URL;
export async function getNotes() {
	const url = apiurl + '/api/note/get';
	const response = await axios.post(url, {});
	return response.data;
}

export async function insertNote(data) {
	const url = apiurl + '/api/note/insert';
	const response = await axios.post(url, data);
	return response;
}

export async function deleteNote(id) {
	const url = apiurl + '/api/note/delete';
	const response = await axios.post(url, { id: id });
	return response;
}

export async function updateNote(data) {
	const url = apiurl + '/api/note/update';
	const response = await axios.post(url, data);
	return response;
}

export async function deleteFolder(folder) {
  const url = apiurl + '/api/note/deleteFolder';
	const response = await axios.post(url, { folder: folder });
	return response;
}
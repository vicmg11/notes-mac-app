import React, { createContext, useState, useReducer, useEffect, useRef } from 'react';
import moment from 'moment';
import * as APIService from '../library/api';
export const NoteContext = createContext();

// This context provider is passed to any component requiring the context
export const NoteProvider = ({ children }) => {
	const [ openFolder, setOpenFolder ] = useState(true);
	const [ note, setNote ] = useState({});
	const [ currentId, setCurrentId ] = useState('');
	const [ activeClass, setActiveClass ] = useState('active');
	const [ loading, setLoading ] = useState(false);
	const [ search, setSearch ] = useState('');
	const [ currentFolder, setCurrentFolder ] = useState('Notes');
	const [ activeFolder, setActiveFolder ] = useState(''); //For folder removal

	const textRef = useRef(null);

	const getId = () => {
		let newId = 'tmpNewNoteId';
		setCurrentId('tmpNewNoteId');
		return newId;
	};

	const newNote = (newName) => {
		const newRecordNote = {
			id: getId(),
			text: '',
			date: moment().format('YYYY-MM-DD HH:mm:ss'),
			folder: currentFolder || newName
		};
		setNote({});
		setActiveFolder('');
		setActiveClass('active');
		notesDispatch({ type: 'NEW_NOTE', payload: newRecordNote });
	};

	/*
*	Find the lowest item to activate
*/
	const deleteNote = () => {
		dataDelete(currentId);
	};

	const continueDeleting = (id) => {
		const newList = notesList.filter((item) => item.folder === currentFolder);
		const index = newList.findIndex((item) => item.id === id);
		let newIndex = newList[index + 1] ? index + 1 : newList.length - 2;

		if (newList[newIndex]) {
			setNote(newList[newIndex]);
			setCurrentId(newList[newIndex].id);
			setActiveClass('active-click');
		} else {
			setNote({});
			setCurrentId('');
		}
	};

	const selectFirstElement = (listArr) => {
		if (listArr.length > 0) {
			setCurrentId(listArr[0].id);
			setNote(listArr[0]);
			setActiveClass('active');
		} else {
			setCurrentId();
			setNote({});
			setActiveClass('');
		}
	};

	const makeActive = (id) => {
		//found the note an update the text area
		const tmpArr = [ ...notesList ];
		const noteTemp = tmpArr.filter((item) => item.id === id);
		setActiveFolder('');
		setNote(noteTemp[0]);
		setCurrentId(id);
		setActiveClass('active-click');
	};

	/*
	*  This reducer will manage update, add and delete of a note
	*/
	const notesReducer = (prevState, action) => {
		switch (action.type) {
			case 'NEW_NOTE':
				return [ action.payload, ...prevState ];
			case 'UPDATE_NOTE':
				const index = prevState.findIndex((item) => item && item.id === action.payload.id);
				//console.log(index, action.payload.position);
				if (index >= 0 || action.payload.position !== undefined) {
					let indexToUpdate = action.payload.position !== undefined ? action.payload.position : index;
					//Updated Note goes to top of list
					const notesArr = [ ...prevState ];
					notesArr[indexToUpdate] = action.payload;
					let updatedNote = notesArr.splice(indexToUpdate, 1);
					return [ ...updatedNote, ...notesArr ];
				}
				//action.payload.id = getId();
				return [ action.payloadm, ...prevState ];
			case 'DELETE_NOTE':
				const newListArray = prevState.filter((item) => item && item.id !== action.payload.id);
				return newListArray;
			case 'DELETE_NOTE_BY_FOLDER':
				const removeList = prevState.filter((item) => item && item.folder !== action.payload.folder);
				return removeList;
			default:
				return prevState;
		}
	};
	const [ notesList, notesDispatch ] = useReducer(notesReducer, []);

	const sortFolders = (folderArr) => {
		//it will keep the Notes folder on top and then order the rest alphabetically
		folderArr.sort((a, b) => (a.name === 'Notes' ? -1 : b.name === 'Notes' ? 1 : a.name.localeCompare(b.name)));
		return folderArr;
	};

	const afterFolderDeleted = () => {
		//find the folder that has been removed
		const currentPos = folderList.findIndex((item) => item.name === currentFolder);
		let index = currentPos === folderList.length - 1 ? currentPos - 1 : currentPos + 1;
		//Intialize to new folder
		setActiveClass('active');
		setNote({});
		setCurrentId('');
		setActiveFolder('folder-clicked');
		setCurrentFolder(folderList[index].name);
	};

	/*
	*  This reducer will manage update, add and delete of a folder
	*/
	const folderReducer = (prevState, action) => {
		switch ((prevState, action.type)) {
			case 'UPDATE_FOLDER':
				const indexUpdate = prevState.findIndex((item) => item && item.name === action.payload.name);
				if (indexUpdate >= 0) {
					const folderArr = [ ...prevState ];
					folderArr[indexUpdate] = action.payload;
					sortFolders(folderArr);
					return [ ...folderArr ];
				}
				return prevState;
			case 'ADD_FOLDER':
				const indexAdd = prevState.findIndex((item) => item && item.name === action.payload.name);
				if (indexAdd >= 0) {
					//folder exist no need to add it
					return;
				}
				let newArr = [ ...prevState, action.payload ];
				sortFolders(newArr);
				return [ ...newArr ];
			case 'DELETE_FOLDER':
				const newListArray = prevState.filter((item) => item && item.name !== action.payload.name);
				return newListArray;
			default:
				return prevState;
		}
	};
	const [ folderList, folderDispatch ] = useReducer(folderReducer, []);

	/*
	*  Save a note to the DB then update the reducer once the record is updated successfully
	*/
	const dataUpdate = async (data) => {
		try {
			const response = await APIService.updateNote(data);
			if (response.status === 200) {
				notesDispatch({ type: 'UPDATE_NOTE', payload: data });
			} else {
				console.log('Error updating data!');
			}
		} catch (err) {
			console.log('Error inserting data-----------', err);
		}
	};

	/*
		*  delete a note to the DB then update the reducer once the record is updated successfully
	*/
	const dataDelete = async (id) => {
		try {
			const response = await APIService.deleteNote(id);
			if (response.status === 200) {
				notesDispatch({ type: 'DELETE_NOTE', payload: { id: id } });
				continueDeleting(id);
			} else {
				console.log('Error updating data!');
			}
		} catch (err) {
			console.log('Error inserting data-----------', err);
		}
	};

	/*
		*  delete a folder to the DB then update the reducer once the record is updated successfully
	*/
	const dataDeleteFolder = async (folder) => {
		try {
			const response = await APIService.deleteFolder(folder);
			if (response.status === 200) {
				//remove active selected class
				setActiveFolder('');
				//delete folder
				folderDispatch({ type: 'DELETE_FOLDER', payload: { name: folder } });
				//delete notes from the folder just removed
				notesDispatch({ type: 'DELETE_NOTE_BY_FOLDER', payload: { folder: folder } });
				//intialize folder
				afterFolderDeleted();
			} else {
				console.log('Error deleting folder!');
			}
		} catch (err) {
			console.log('Error inserting data-----------', err);
		}
	};

	/*
	*  Save a note to the DB then update the reducer once the record is updated successfully
	*/
	const dataInsert = async (data) => {
		try {
			const response = await APIService.insertNote(data);
			if (response.status === 200) {
				if (currentId === 'tmpNewNoteId') {
					data.position = notesList.findIndex((item) => item.id === 'tmpNewNoteId');
				}
				data.id = response.data.note.id;
				setCurrentId(data.id);
				setActiveClass('active');
				notesDispatch({ type: 'UPDATE_NOTE', payload: data });
				return data.id;
			} else {
				console.log('Error saving data!');
			}
		} catch (err) {
			console.log('Error inserting data-----------', err);
		}
	};

	/*
	*	Call the api once the component is mounted and get the notes
	*/
	useEffect(() => {
		let mounted = true;
		async function loadData() {
			try {
				const response = await APIService.getNotes();
				if (mounted) {
					if (response.status) {
						let dbFolders = {};
						let dbNotes = response.notes;
						let firstNote;
						for (let idx in dbNotes) {
							const newNote = {
								id: dbNotes[idx].id,
								text: dbNotes[idx].content,
								date: dbNotes[idx].date,
								folder: dbNotes[idx].folder,
								createdAt: dbNotes[idx].createdAt,
								updatedAt: dbNotes[idx].updatedAt
							};
							if (dbNotes[idx].folder === 'Notes') {
								firstNote = newNote;
							}
							notesDispatch({ type: 'NEW_NOTE', payload: newNote });
							dbFolders[newNote.folder] = 'dbFolder';
						}
						if (firstNote !== undefined) {
							selectFirstElement([ firstNote ]);
							for (let folder in dbFolders) {
								folderDispatch({
									type: 'ADD_FOLDER',
									payload: {
										name: folder
									}
								});
							}
						} else {
							folderDispatch({
								type: 'ADD_FOLDER',
								payload: {
									name: 'Notes'
								}
							});
						}
						setLoading(true);
					} else {
						console.log('Error loading data!');
					}
				}
			} catch (err) {
				console.log('Error loading data-----------', err);
			}
		}
		loadData();
		return () => {
			mounted = false;
		};
	}, []);

	return (
		<NoteContext.Provider
			value={{
				openFolder,
				notesList,
				note,
				currentId,
				activeClass,
				currentFolder,
				folderList,
				activeFolder,
				textRef,
				search,
				loading,
				dataInsert,
				dataUpdate,
				dataDeleteFolder,
				makeActive,
				newNote,
				deleteNote,
				setSearch,
				setOpenFolder,
				notesDispatch,
				folderDispatch,
				setNote,
				setCurrentId,
				setActiveClass,
				setCurrentFolder,
				setActiveFolder,
				afterFolderDeleted,
				selectFirstElement
			}}
		>
			{children}
		</NoteContext.Provider>
	);
};

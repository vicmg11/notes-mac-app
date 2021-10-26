import React, { createContext, useState, useReducer, useEffect, useRef } from 'react';
import { v1 as uuidv1 } from 'uuid';
export const NoteContext = createContext();

// This context provider is passed to any component requiring the context
export const NoteProvider = ({ children }) => {
	const [ openFolder, setOpenFolder ] = useState(true);
	const [ note, setNote ] = useState({});
	const [ currentId, setCurrentId ] = useState('');
	const [ activeClass, setActiveClass ] = useState('active');
	const [ search, setSearch ] = useState('');
	const [ currentFolder, setCurrentFolder ] = useState('Notes');
	const [ activeFolder, setActiveFolder ] = useState(''); //For folder removal

	const textRef = useRef(null);
	const getId = () => {
		let newId = uuidv1();
		setCurrentId(newId);
		return newId;
	};

	const newNote = () => {
		const newNote = {
			text: '',
			date: new Date(),
			id: getId(),
			folder: currentFolder
		};
		setNote({});
		setActiveFolder('');
		setActiveClass('active');
		notesDispatch({ type: 'NEW_NOTE', payload: newNote });
	};

	const deleteNote = () => {
		const index = notesList.findIndex((item) => item.id === currentId);
		const newList = notesList.filter((item) => item.folder === currentFolder);
		let newIndex = newList[index + 1] ? index + 1 : newList.length - 2;

		//console.log('delete note index:', index, ' new index:', newIndex, ' array len:', newList.length, currentFolder);
		//Select another note and make it active
		if (notesList[newIndex]) {
			setCurrentId(newList[newIndex].id);
			setNote(newList[newIndex]);
		} else {
			setNote({});
			setCurrentId('');
		}
		notesDispatch({
			type: 'DELETE_NOTE',
			payload: {
				id: currentId
			}
		});
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
		//console.log('makeActive', noteTemp, id);
		setActiveFolder('');
		setNote(noteTemp[0]);
		setCurrentId(id);
		setActiveClass('active-click');
	};

	const notesReducer = (prevState, action) => {
		//console.log('this is the note reducer ', action);
		switch (action.type) {
			case 'NEW_NOTE':
				return [ action.payload, ...prevState ];
			case 'ADD_NOTE':
				const index = prevState.findIndex((item) => item.id === action.payload.id);
				if (index >= 0) {
					//Updated Note goes to top of list
					const notesArr = [ ...prevState ];
					notesArr[index] = action.payload;
					let updatedNote = notesArr.splice(index, 1);
					return [ ...updatedNote, ...notesArr ];
				}
				action.payload.id = getId();
				return [ ...prevState, action.payload ];
			case 'DELETE_NOTE':
				const newListArray = prevState.filter((item) => item.id !== action.payload.id);
				return newListArray;
			case 'DELETE_NOTE_BY_FOLDER':
				const removeList = prevState.filter((item) => item.folder !== action.payload.folder);
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
		//console.log('new selected folder position removed -->', currentPos, index);
		//Intialize to new folder
		setActiveClass('active');
		setNote({});
		setCurrentId('');
		setActiveFolder('folder-clicked');
		setCurrentFolder(folderList[index].name);
	};

	const folderReducer = (prevState, action) => {
		//console.log('this is the folder reducer');
		switch ((prevState, action.type)) {
			case 'UPDATE_FOLDER':
				const indexUpdate = prevState.findIndex((item) => item.name === action.payload.name);
				if (indexUpdate >= 0) {
					const folderArr = [ ...prevState ];
					folderArr[indexUpdate] = action.payload;
					sortFolders(folderArr);
					return [ ...folderArr ];
				}
				return prevState;
			case 'ADD_FOLDER':
				const indexAdd = prevState.findIndex((item) => item.name === action.payload.name);
				console.log(indexAdd);

				if (indexAdd >= 0) {
					//folder exist display a message
					return;
				}
				let newArr = [ ...prevState, action.payload ];
				sortFolders(newArr);
				return [ ...newArr ];
			case 'DELETE_FOLDER':
				const newListArray = prevState.filter((item) => item.name !== action.payload.name);
				return newListArray;
			default:
				return prevState;
		}
	};
	const [ folderList, folderDispatch ] = useReducer(folderReducer, [ { name: 'Notes' } ]);

	useEffect(() => {
		//call the api
		console.log('use efect context');
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

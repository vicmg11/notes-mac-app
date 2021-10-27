import React, { useState, useRef, useContext } from 'react';
import { NoteContext } from './NoteContext';
import styled from 'styled-components';
import FolderHeader from '../components/FolderHeader';
import AlertBox from './AlertBox';

function Folders({ folders }) {
	const [ newFolder, setNewFolder ] = useState('');
	const [ showInput, setShowInput ] = useState(false);
	const [ open, setOpen ] = useState(false);
	const [ suggestedName, setSuggestedName ] = useState('');
	const inputRef = useRef(null);
	const noteFn = useContext(NoteContext);

	const alertUser = () => {
		setOpen(true);
	};

	const handleCancel = () => {
		createFolder();
		setOpen(false);
		inputRef.current.focus();
	};

	const handleConfirm = () => {
		setOpen(false);
		inputRef.current.focus();
	};

	const createFolder = () => {
		let validName = 'notFound';
		let newName = 'New Folder';
		let counter = 0;
		while (validName === 'notFound') {
			let fileName = newName; 
			let findIndex = folders.findIndex((item) => item.name === fileName);
			if (findIndex === -1) {
				validName = 'found';
			} else {
				counter++;
				newName = 'New Folder ' + counter;
			}
		}
		setSuggestedName(newName);
		setNewFolder(newName);
		setShowInput(true);
		noteFn.setNote({});
		noteFn.setCurrentId('');
		noteFn.setCurrentFolder(newName);
		noteFn.setActiveFolder('folder-clicked');
		setTimeout(() => {
			inputRef.current.focus();
		}, 0);
	};

	const handleBlur = (e) => {

		let findIndex = folders.findIndex((item) => item.name === newFolder);
		if (findIndex >= 0 && suggestedName !== newFolder) {
			alertUser();
			return;
		}

		noteFn.folderDispatch({
			type: 'ADD_FOLDER',
			payload: {
				name: newFolder
			}
		});
		setShowInput(false);
		noteFn.setCurrentFolder(newFolder);
	};

	const updateFolder = (e) => {
		setNewFolder(e.target.value);
	};

	const selectFolder = (folder) => {
		noteFn.setActiveFolder('folder-clicked');
		const index = noteFn.notesList.findIndex((item) => item.folder === folder);
		//Intialize to new folder and update accordingly some folders may not have notes
		noteFn.setActiveClass('active');
		if (index >= 0) {
			noteFn.setCurrentId(noteFn.notesList[index].id);
			noteFn.setNote(noteFn.notesList[index]);
		} else {
			noteFn.setNote({});
			noteFn.setCurrentId('');
		}
		noteFn.setCurrentFolder(folder);
		noteFn.setSearch('');
	};

	return (
		<MyFolders>
			<FolderHeader />
			<AlertBox
				classType={`alert-box ${open ? '' : 'hide-box'}`}
				title={'Name Taken'}
				subtitle={'Please choose a different name.'}
				cancelTxt={'Discharge Change'}
				deleteTxt={'OK'}
				handleCancel={handleCancel}
				handleConfirm={handleConfirm}
				icon={'./alert.png'}
			/>
			<div className="body-folders">
				{folders &&
					folders.map((folder, index) => (
						<div
							key={index}
							className={`folder ${folder.name === noteFn.currentFolder
								? 'folder-active ' + noteFn.activeFolder
								: ''}`}
							onClick={() => selectFolder(folder.name)}
						>
							{folder.name}
						</div>
					))}
			</div>
			<div className={`${showInput ? 'folder folder-active input-active' : 'hide-box'}`}>
				<input
					ref={inputRef}
					value={newFolder}
					onChange={updateFolder}
					onBlur={handleBlur}
					onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
				/>
			</div>
			<div className="create-folders" onClick={() => createFolder()}>
				<div className="new-folder-icon">
					<div className="plus-type">+</div>
				</div>
				<div className="new-folder">New Folder</div>
			</div>
		</MyFolders>
	);
}

export default Folders;

const MyFolders = styled.div`
	background: #f3efec;
	.body-notes {
		border-right: 1px solid #e9e9e9;
		height: 100vh;
	}
	.folder {
		font-size: 0.65em;
		padding-left: 14px;
		height: 20px;
		display: flex;
	}

	.folder-active {
		background-color: #d0cccf99;
		font-weight: bold;
		input {
			margin-top: 2px;
			height: 16px;
		}
		input:focus {
			outline: none;
		}
		&.input-active {
			background-color: #258afa;
		}
	}
	.folder-clicked {
		background-color: #258afa;
		color: white;
	}
	.create-folders {
		display: flex;
		align-items: center;
		position: absolute;
		bottom: 1px;
		margin-left: 8px;
	}
	.new-folder {
		font-size: 0.65em;
		margin-left: 5px;
	}
	.new-folder-icon {
		background-color: #989491;
		height: 10px;
		width: 10px;
		border-radius: 50%;
	}
	.plus-type {
		color: white;
		position: absolute;
		font-family: sans-serif;
		line-height: 8px;
		width: 10px;
		height: 10px;
		text-align: center;
		font-weight: 100;
	}
	.hide-box {
		display: none;
	}
`;

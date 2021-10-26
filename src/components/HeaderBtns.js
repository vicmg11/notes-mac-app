import React, { useContext, useState } from 'react';
import { NoteContext } from './NoteContext';
import AlertBox from './AlertBox';
import styled from 'styled-components';

const Header = () => {
	const noteFn = useContext(NoteContext);
	const [ open, setOpen ] = useState(false);

	const alertUser = () => {
		const items = noteFn.notesList.filter((item) => item.folder === noteFn.currentFolder);
		//do not prompt to delete folder if folders does not have any notes
		if (items.length > 0) {
			setOpen(true);
		} else {
			handleConfirm();
		}
	};

	const handleConfirm = () => {
		console.log('check handleConfirm');
		setOpen(false);
		//remove active selected class
		noteFn.setActiveFolder('');
		//delete folder
		noteFn.folderDispatch({ type: 'DELETE_FOLDER', payload: { name: noteFn.currentFolder } });
		//delete notes from the folder just removed
		noteFn.notesDispatch({ type: 'DELETE_NOTE_BY_FOLDER', payload: { folder: noteFn.currentFolder } });
		//intialize folder
		noteFn.afterFolderDeleted();
	};

	const handleCancel = () => {
		console.log('check cancel');
		setOpen(false);
	};

	const checkWhattoDelete = () => {
		console.log('que pasa? ', noteFn.activeFolder);
		noteFn.setSearch('');
		if (noteFn.activeFolder === 'folder-clicked') {
			if (noteFn.currentFolder === 'Notes') {
				//notes folder cannot be deleted
				return;
			}
			alertUser();
		} else {
			noteFn.deleteNote();
		}
	};

	const editNote = () => {
		noteFn.newNote();
		noteFn.setSearch('');
		noteFn.textRef.current.focus();
	};

	const notes = noteFn.notesList.filter((item) => item.folder === noteFn.currentFolder);
	return (
		<BtnHeader className="header">
			<AlertBox
				classType={`alert-box ${open ? '' : 'hide-box'}`}
				title={`Are you sure you want to delete "${noteFn.currentFolder}"?`}
				subtitle={'All notes and any subfolders will be deleted.'}
				cancelTxt={'Cancel'}
				deleteTxt={'Delete Folder'}
				handleCancel={handleCancel}
				handleConfirm={handleConfirm}
				icon={'./note.png'}
			/>
			<div className={`action-btns ${noteFn.openFolder ? '' : 'close-folder'}`}>
				<div className="action-btn folder" onClick={() => noteFn.setOpenFolder(!noteFn.openFolder)} />
				<div
					className={`action-btn trash ${noteFn.currentFolder} ${noteFn.activeFolder}`}
					onClick={checkWhattoDelete}
				/>
				<div
					className={`action-btn edit ${notes.length > 0 &&
					(noteFn.note.text === '' || noteFn.note.text === undefined)
						? 'standby-mode'
						: ''}`}
					onClick={editNote}
				/>
			</div>
		</BtnHeader>
	);
};

export default Header;

const BtnHeader = styled.div`
	.action-btns {
		display: flex;
	}
	.action-btn {
		height: 18px;
		width: 32px;
		background: #ffffff97;
		margin-right: 4px;
		border-radius: 4px;
		border: 1px solid rgba(34, 36, 38, .15);
		background-repeat: no-repeat;
		background-position: center center;
		cursor: pointer;
		&.folder {
			background-image: url("./folder.png");
			background-size: 0.45cm;
		}
		&.trash {
			background-image: url("./trash.png");
			background-size: 0.3cm;
			&.Notes.folder-clicked {
				opacity: 0.4;
			}
		}
		&.edit {
			background-image: url("./edit.png");
			background-size: 0.48cm;
			padding-bottom: 1px;
			&.standby-mode {
				opacity: 0.4;
			}
		}
	}
	.close-folder {
		margin-left: 10px;
	}
`;

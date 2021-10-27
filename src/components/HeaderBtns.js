import React, { useContext, useState } from 'react';
import { NoteContext } from './NoteContext';
import AlertBox from './AlertBox';
import styled from 'styled-components';

const Header = ({ notesList, currentFolder, openFolder, activeFolder, note }) => {
	const noteFn = useContext(NoteContext);
	const [ open, setOpen ] = useState(false);

	const alertUser = () => {
		const items = notesList.filter((item) => item.folder === currentFolder);
		//do not prompt to delete folder if folders does not have any notes
		if (items.length > 0) {
			setOpen(true);
		} else {
			handleConfirm();
		}
	};

	const handleConfirm = () => {
		setOpen(false);
		noteFn.dataDeleteFolder(currentFolder);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	const checkWhattoDelete = () => {
		noteFn.setSearch('');
		if (activeFolder === 'folder-clicked') {
			if (currentFolder === 'Notes') {
				//notes folder cannot be deleted
				return;
			}
			alertUser();
		} else {
			noteFn.deleteNote();
		}
	};

	const editNote = () => {
		//not do anything if note is new
		if (note.text === '' || note.text === undefined) {
			return;
		}
		noteFn.newNote();
		noteFn.setSearch('');
		noteFn.textRef && noteFn.textRef.current.focus();
	};

	const notes = notesList.filter((item) => item && item.folder === currentFolder);
	const disable = notes.length > 0 && (note && (note.text === '' || note.text === undefined));
	return (
		<BtnHeader className="header">
			<AlertBox
				classType={`alert-box ${open ? '' : 'hide-box'}`}
				title={`Are you sure you want to delete "${currentFolder}"?`}
				subtitle={'All notes will be deleted.'}
				cancelTxt={'Cancel'}
				deleteTxt={'Delete Folder'}
				handleCancel={handleCancel}
				handleConfirm={handleConfirm}
				icon={'./note.png'}
			/>
			<div className={`action-btns ${openFolder ? '' : 'close-folder'}`}>
				<div className="action-btn folder" onClick={() => noteFn.setOpenFolder(!openFolder)} />
				<div className={`action-btn trash ${currentFolder} ${activeFolder}`} onClick={checkWhattoDelete} />
				<div
					className={`action-btn edit ${disable ? 'standby-mode' : ''}`}
					onClick={disable ? () => false : editNote}
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

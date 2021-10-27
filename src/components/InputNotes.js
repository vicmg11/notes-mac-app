import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { getFormatDate } from '../library/Librabry';
import { NoteContext } from '../components/NoteContext';
import AlertBox from './AlertBox';
import SearchBar from './SearchBar';

function InputNotes() {
	const noteFn = useContext(NoteContext);
	const [ date, setDate ] = useState([]);
	const [ text, setText ] = useState('');
	const [ open, setOpen ] = useState(false);

	const addNote = (action) => {
		if (action === 'click' && (noteFn.note.text === '' || noteFn.note.text === undefined)) {
			noteFn.newNote();
			noteFn.setSearch('');
			return;
		}

		noteFn.setActiveFolder('');
		if (action === 'click,' && noteFn.note.text) {
			return;
		}

		const currentNote = {
			content: text,
			text: text,
			date: moment().format('YYYY-MM-DD HH:mm:ss'),
			folder: noteFn.note.folder ? noteFn.note.folder : noteFn.currentFolder
		};

		if (noteFn.currentId && noteFn.currentId !== 'tmpNewNoteId') {
			currentNote['id'] = noteFn.currentId;
			noteFn.dataUpdate(currentNote);
		} else {
			currentNote['id'] = noteFn.dataInsert(currentNote);
		}
		noteFn.setNote(currentNote);
	};

	const isNoteUpdated = () => {
		let text1 = text ? text.split('\n').join('') : '';
		let text2 =
			Object.keys(noteFn.note).length > 0 && noteFn.note.text ? noteFn.note.text.split('\n').join('') : '';
		return text1 !== text2 && text1.length > 0;
	};

	const checkIfNoteEntered = () => {
		if (isNoteUpdated()) {
			setOpen(true);
		} else if (noteFn.note.text === '' || noteFn.note.text === undefined) {
			noteFn.deleteNote();
		}
	};

	const checkKeyPressed = (e) => {
		if (e.key === 'Enter') {
			if (isNoteUpdated()) {
				addNote('change');
			}
		}
	};

	const handleCancel = () => {
		setOpen(false);
		noteFn.textRef.current.focus();
	};

	const handleConfirm = () => {
		setText(noteFn.note.text);
		setOpen(false);
	};

	useEffect(
		() => {
			const d = noteFn.note.date ? noteFn.note.date : new Date().toString();
			setDate([ getFormatDate(d), d ]);
			setText(noteFn.note.text || '');
		},
		[ noteFn.note, noteFn.search ]
	);

	return (
		<MyNotes>
			<AlertBox
				classType={`alert-box ${open ? '' : 'hide-box'}`}
				title={`Unsaved changes found!`}
				subtitle={'Click "Cancel" and save the last changes by pressing "Enter".'}
				cancelTxt={'Cancel'}
				deleteTxt={'Continue'}
				handleCancel={handleCancel}
				handleConfirm={handleConfirm}
				icon={'./alert.png'}
			/>
			<SearchBar />
			<div className="current-date">{date[0]}</div>
			<textarea
				ref={noteFn.textRef}
				className="myInputDiv"
				name="textarea"
				value={text || noteFn.note.text || ''}
				onChange={(e) => setText(e.target.value)}
				onClick={() => addNote('click')}
				onBlur={checkIfNoteEntered}
				onKeyDown={checkKeyPressed}
			/>
		</MyNotes>
	);
}

export default InputNotes;

const MyNotes = styled.div`
	background: #f9faf8;
	height: 100vh;
	.current-date {
		text-align: center;
		background: #fafbf9;
		font-size: 0.7em;
		color: #00000075;
		margin-top: 2px;
	}
	.myInputDiv {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border: #fafbf9;
		background: #fafbf9;
		padding: 4px 20px;
		font-size: 0.7em;
	}
	textarea:focus,
	input:focus {
		outline: none;
	}
`;

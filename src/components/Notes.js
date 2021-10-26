import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { NoteContext } from '../components/NoteContext';
import HeaderBtns from './HeaderBtns';
import Note from './Note';

function Notes({ notesList }) {
	const noteFn = useContext(NoteContext);
	const [ newList, setNewList ] = useState([]);

	useEffect(
		() => {
			let filteredList;
			if (noteFn.search) {
				filteredList = noteFn.notesList.filter((item, _) => item.text.toLowerCase().includes(noteFn.search));
			} else {
				filteredList = noteFn.notesList.filter((item, _) => item.folder === noteFn.currentFolder);
			}
			setNewList(filteredList);
			noteFn.selectFirstElement(filteredList);
		},
		[ noteFn.search, noteFn.notesList, noteFn.currentFolder ]
	);

	return (
		<MyMainNotes>
			<HeaderBtns />
			<div className="body-notes">
				{newList && newList.map((note, index) => <Note note={note} index={index} key={index} />)}
			</div>
		</MyMainNotes>
	);
}

export default Notes;

const MyMainNotes = styled.div`
	background: #f9faf8;
	.body-notes {
		border-right: 1px solid #e9e9e9;
		height: 100vh;
	}
`;

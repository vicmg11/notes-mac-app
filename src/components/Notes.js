import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeaderBtns from './HeaderBtns';
import Note from './Note';

function Notes({ search, notesList, currentFolder, selectFirstElement, activeClass, currentId }) {
	const [ newList, setNewList ] = useState([]);

	useEffect(
		() => {
			function getList() {
				let filteredList;
				if (search) {
					filteredList = notesList.filter((item, _) => item && item.text.toLowerCase().includes(search));
				} else {
					filteredList = notesList.filter((item, _) => item && item.folder === currentFolder);
				}
				setNewList(filteredList);
				selectFirstElement(filteredList);
			}
			getList();
		},
		[ search, notesList, currentFolder ]
	);

	return (
		<MyMainNotes>
			<HeaderBtns />
			<div className="body-notes">
				{newList &&
					newList.map((note, index) => (
						<Note note={note} key={index} search={search} activeClass={activeClass} currentId={currentId} />
					))}
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

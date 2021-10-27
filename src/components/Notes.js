import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeaderBtns from './HeaderBtns';
import Note from './Note';

function Notes({
	search,
	notesList,
	currentFolder,
	selectFirstElement,
	activeClass,
	currentId,
	openFolder,
	activeFolder,
	note,
	loading
}) {
	const [ newList, setNewList ] = useState([]);

	useEffect(
		() => {
			function getList() {
				let filteredList;
				if (search) {
					filteredList = notesList.filter(
						(item, _) => item && item.text.toLowerCase().includes(search.toLowerCase())
					);
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
			<HeaderBtns
				notesList={notesList}
				currentFolder={currentFolder}
				openFolder={openFolder}
				activeFolder={activeFolder}
				note={note}
			/>

			<div className="body-notes">
				{loading ? (
					newList &&
					newList.map((note, index) => (
						<Note note={note} key={index} search={search} activeClass={activeClass} currentId={currentId} />
					))
				) : (
					<div className="loading-msg">Loading....</div>
				)}
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
	.loading-msg {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 40px;
		font-size: 0.8em;
	}
`;

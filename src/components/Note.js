import React, { useContext } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';

import { NoteContext } from '../components/NoteContext';
import { getTimeFormat } from '../library/Librabry';

const Note = ({ note, search, activeClass, currentId }) => {
	const noteFn = useContext(NoteContext);
	if (note.text === null) {
		return <div />;
	}
	let cleanArr = note.text.split('\n').filter((item) => item !== '');
	return (
		<MyNote
			className={` ${search ? 'search-view' : ''} ${note.id === currentId ? activeClass : ''}`}
			onClick={() => noteFn.makeActive(note.id)}
		>
			<div className="note-text note-ellipsis">
				<b>{cleanArr[0] || 'New Note'}</b>
			</div>
			<div className={`note-info ${search ? 'show-folder' : ''}`}>
				<div>
					{moment().subtract(1, 'days') < new Date(note.date) ? (
						getTimeFormat(note.date)
					) : (
						moment(note.date).format('MM/DD/YY')
					)}
				</div>
				{search ? (
					<div>
						<Icon name="folder outline" />
						{note.folder}
					</div>
				) : (
					<div className="extra-text note-ellipsis">{cleanArr[1] || 'No additional text'}</div>
				)}
			</div>
		</MyNote>
	);
};

export default Note;

const MyNote = styled.div`
	border-bottom: 1px solid #e9e9e9;
	font-size: 0.65em;
	height: 40px;
	padding: 8px 12px 8px 20px;
	line-height: 12px;
	&.active {
		background-color: #e4e5e3;
	}
	&.active-click {
		background-color: #fde288;
	}
	&.search-view {
		height: 50px;
	}
	.note-ellipsis {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.show-folder {
		flex-direction: column;
	}
	.note-text {
		width: 166px;
	}
	.note-info {
		display: flex;
	}
	.extra-text {
		margin-left: 6px;
		width: 120px;
	}
`;

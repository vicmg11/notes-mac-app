import React, { useContext } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';

import { NoteContext } from '../components/NoteContext';
import { getTimeFormat } from '../library/Librabry';

function Note({ note, index }) {
	const noteFn = useContext(NoteContext);
	let cleanArr = note.text.split('\n').filter((item) => item !== '');

	return (
		<MyNote
			className={` ${noteFn.search ? 'search-view' : ''} ${note.id === noteFn.currentId
				? noteFn.activeClass
				: ''}`}
			onClick={() => noteFn.makeActive(note.id)}
		>
			<div className="note-text note-ellipsis">
				<b>{cleanArr[0] || 'New Note'}</b>
			</div>
			<div className={`note-info ${noteFn.search ? 'show-folder' : ''}`}>
				<div>
					{new Date(note.date) > new Date() ? moment(note.date).format('DD/MM/YY') : getTimeFormat(note.date)}
				</div>
				{noteFn.search ? (
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
}

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

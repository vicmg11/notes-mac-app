import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import Notes from './Notes';

describe('Render Notes Component', () => {
	test('renders without crashing', () => {
		const props = {
			search: 'test',
			notesList: [
				{
					createdAt: '2021-10-27T05:56:28.000Z',
					date: '2021-10-26T22:56:28.000Z',
					folder: 'Notes',
					id: 1,
					text: 'This is my first note!',
					updatedAt: '2021-10-27T05:56:28.000Z'
				},
				{
					createdAt: '2021-10-27T08:04:29.000Z',
					date: '2021-10-27T01:04:29.000Z',
					folder: 'Notes',
					id: 2,
					text: 'One more Note\nSecond Line',
					updatedAt: '2021-10-27T08:04:29.000Z'
				}
			],
			currentFolder: 'Notes',
			selectFirstElement: () => {},
			activeClass: 'active',
			currentId: 1,
			openFolder: true,
			activeFolder: 'folder-clicked',
			note: {
				id: 1,
				date: '2021-10-26T22:56:28.000Z',
				folder: 'Notes',
				text: 'This is my first note!',
				createdAt: '2021-10-27T05:56:28.000Z',
				updatedAt: '2021-10-27T05:56:28.000Z'
			}
		};
		const div = document.createElement('div');
		ReactDOM.render(<Notes {...props} />, div);
	});
});

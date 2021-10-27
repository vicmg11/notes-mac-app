import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import { NoteContext } from './NoteContext';
import { render, fireEvent } from '@testing-library/react';

import HeaderBtns from './HeaderBtns';

describe('Render Action Buttons Component', () => {
	test('renders without crashing', () => {
		const props = {
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
		ReactDOM.render(<HeaderBtns {...props} />, div);
	});

	test('check create Note Action buttons', async () => {
		const props = {
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
			openFolder: true,
			activeFolder: 'folder-clicked',
			note: {
				id: 1,
				date: '2021-10-26T22:56:28.000Z',
				folder: 'Notes',
				text: 'This is my first note!',
				createdAt: '2021-10-27T05:56:28.000Z',
				updatedAt: '2021-10-27T05:56:28.000Z'
			},
		};
		const newNote = () => {};
		const setSearch = () => {};
		const setOpenFolder = () => {};

		const { container } = render(
			<NoteContext.Provider value={{ newNote, setSearch, setOpenFolder }}>
				<HeaderBtns {...props} />
			</NoteContext.Provider>
		);
		const button1 = container.querySelector('.action-btn.folder');
		expect(button1).toBeInTheDocument();
		expect(fireEvent.click(button1)).toBeDefined();

		const button2 = container.querySelector('.action-btn.trash');
		expect(button2).toBeInTheDocument();
		expect(fireEvent.click(button2)).toBeDefined();

		const button3 = container.querySelector('.action-btn.edit');
		expect(button3).toBeInTheDocument();
		expect(fireEvent.click(button3)).toBeDefined();
	});
});

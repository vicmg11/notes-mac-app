import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import Note from './Note';

describe('Render Note Component', () => {
	test('renders without crashing', () => {
		const props = {
			note: {
				id: 1,
				date: '2021-10-26T22:56:28.000Z',
				folder: 'Notes',
				text: 'This is my first note!',
				createdAt: '2021-10-27T05:56:28.000Z',
				updatedAt: '2021-10-27T05:56:28.000Z'
			},
      key: 1
		};
		const div = document.createElement('div');
		ReactDOM.render(<Note {...props} />, div);
	});
});

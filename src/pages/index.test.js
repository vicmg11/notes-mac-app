import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { getNotes } from '../library/api';

global.fetch = require('jest-fetch-mock');
afterEach(() => {
	cleanup;
});

// If API is not responding the following error will appear
//    Expected number of calls: >= 1
//    Received number of calls:    0

describe('Test API Call for Notes', () => {
	test('fetch to api', async () => {
		const mockNotes = {
			notes: [
				{
					id: 138,
					content: 'My First Note change',
					date: '2021-10-28T15:57:22.000Z',
					folder: 'Notes',
					createdAt: '2021-10-27T08:04:29.000Z',
					updatedAt: '2021-10-28T22:57:22.000Z'
				}
			],
			status: true
		}
		fetch.mockResponseOnce(JSON.stringify(mockNotes));
		const onResponse = jest.fn();
		const onError = jest.fn();

		return getNotes().then(onResponse).catch(onError).finally(() => {
			expect(onResponse).toHaveBeenCalled();
			expect(onError).not.toHaveBeenCalled();
		});
	});
});

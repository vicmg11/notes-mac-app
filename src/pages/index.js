import React, { useContext } from 'react';
import { NoteContext } from '../components/NoteContext';
import Folders from '../components/Folders';
import Notes from '../components/Notes';
import InputNotes from '../components/InputNotes';

function Index() {
	const noteFn = useContext(NoteContext);

	return (
		<div>
			<div className={noteFn.openFolder ? 'folder-open' : 'folder-close'}>
				{noteFn.openFolder && <Folders folders={noteFn.folderList} />}
				<Notes />
				<InputNotes />
			</div>
		</div>
	);
}

export default Index;

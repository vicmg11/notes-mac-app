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
				<Notes
					search={noteFn.search}
					notesList={noteFn.notesList}
					currentFolder={noteFn.currentFolder}
					selectFirstElement={noteFn.selectFirstElement}
					activeClass={noteFn.activeClass}
					currentId={noteFn.currentId}
					openFolder={noteFn.openFolder}
					activeFolder={noteFn.activeFolder}
					note={noteFn.note}
					loading={noteFn.loading}
				/>
				<InputNotes note={noteFn.note} search={noteFn.search}/>
			</div>
		</div>
	);
}

export default Index;

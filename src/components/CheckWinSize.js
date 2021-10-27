import React, { useContext } from 'react';
import { NoteContext } from './NoteContext';

function CheckWinSize({ windowWidth }) {
	const noteFn = useContext(NoteContext);
	if (windowWidth = 458) {
		noteFn.setOpenFolder(false);
	}  
  if (windowWidth = 460) {
		noteFn.setOpenFolder(true);
	}  
	return <div>{windowWidth}</div>;
}
export default CheckWinSize;

import { useEffect, useState } from 'react';

export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export const getFormatDate = (formatDate) => {
	const noteDate = new Date(formatDate);
	const year = noteDate.getFullYear();
	const date = noteDate.getDate();
	const monthName = months[noteDate.getMonth()];
	const fullDate = `${monthName} ${date}, ${year} at ` + getTimeFormat(noteDate);
	return fullDate;
};

export const getTimeFormat = (timeDate) => {
	const noteDate = new Date(timeDate);
	return noteDate.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3');
};

export const useWindowSize = () => {
	const [ windowSize, setWindowSize ] = useState({
		width: undefined,
		height: undefined
	});
	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight
			});
		}

		window.addEventListener('resize', handleResize);

		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);
	return windowSize;
};

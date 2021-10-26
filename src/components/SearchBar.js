import React, { useContext } from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { NoteContext } from './NoteContext';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';

function SearchBar() {
	const noteFn = useContext(NoteContext);

	return (
		<SearchHeader className="header">
			<Input
				className="search-bar"
				size="mini"
				value={noteFn.search}
				icon="search"
				iconPosition="left"
				placeholder="Search"
				onChange={(e) => noteFn.setSearch(e.target.value)}
			/>
			{noteFn.search && (
				<Icon className="search-bar remove" name="remove circle" onClick={(e) => noteFn.setSearch('')} />
			)}
		</SearchHeader>
	);
}

export default SearchBar;

const SearchHeader = styled.div`
	.search-bar {
		position: absolute !important;
		right: 0;
		margin-right: 6px;
		text-align: right;
		width: 120px;
	}
	.search-bar input {
		padding: 1px 1.6em !important;
	}
	.search-bar i {
		font-size: 0.7em;
	}
	.remove {
		color: #989491;
		font-size: 0.8em;
		height: 19px;
		margin-right: 10px;
	}
	@media (max-width: 435px) {
		.search-bar {
			display: none;
		}	
	}	
`;

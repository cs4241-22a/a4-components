import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NamesList from './components/NamesList';
import Header from './components/Header';

const App = () => {
	const [names, setNames] = useState([
		{
			id: nanoid(),
			text: 'Mr. Saucy Pants',
			date: '10/02/2022',
		},
		{
			id: nanoid(),
			text: 'Add more new Alfie Names!',
			date: '10/03/2022',
		}
	]);

	useEffect(() => {
		const savedNames = JSON.parse(
			localStorage.getItem('alfie-names')
		);
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'alfie-names',
			JSON.stringify(names)
		);
	}, [names]);

	const addName = (text) => {
		const date = new Date();
		const newName = {
			id: nanoid(),
			date: date.toLocaleDateString(),
			text: text,
		};
		const newNames = [...names, newName];
		setNames(newNames);
	};

	const deleteName = (id) => {
		const newNames = names.filter((name) => name.id !== id);
		setNames(newNames);
	};

	return (
			<div className='container'>
				<Header/>
				<NamesList
					names={names.filter((name) =>
						name.text.toLowerCase()
					)}
					handleAddName={addName}
					handleDeleteName={deleteName}
				/>
			</div>
	);
};

export default App;

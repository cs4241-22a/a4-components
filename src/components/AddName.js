import { useState } from 'react';

const AddName = ({ handleAddName }) => {
	const [nameText, setNameText] = useState('');
	const characterLimit = 16;

	const handleChange = (event) => {
		if (characterLimit - event.target.value.length >= 0) {
			setNameText(event.target.value);
		}
	};

	const handleSaveClick = () => {
		if (nameText.trim().length > 0) {
			handleAddName(nameText);
			setNameText('');
		}
	};

	return (
		<div className='name new'>
			<textarea
				rows='8'
				cols='10'
				placeholder='Type to add an Alfie name'
				value={nameText}
				onChange={handleChange}
			></textarea>
			<div className='name-footer'>
				<small>
					{characterLimit - nameText.length} Remaining
				</small>
				<button className='save' onClick={handleSaveClick}>
					Save
				</button>
			</div>
		</div>
	);
};

export default AddName;

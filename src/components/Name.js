
const Name = ({ id, text, date, handleDeleteName }) => {
	return (
		<div className='name'>
			<span>{text}</span>
			<div className='name-footer'>
				<small>{date}</small>
				<button className='save' onClick={() => handleDeleteName(id)}>Delete</button>
			</div>
		</div>
	);
};

export default Name;

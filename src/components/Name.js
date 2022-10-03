import { MdDeleteForever } from 'react-icons/md';

const Name = ({ id, text, date, handleDeleteName }) => {
	return (
		<div className='name'>
			<span>{text}</span>
			<div className='name-footer'>
				<small>{date}</small>
				<MdDeleteForever
					onClick={() => handleDeleteName(id)}
					className='delete-icon'
					size='1.3em'
				/>
			</div>
		</div>
	);
};

export default Name;

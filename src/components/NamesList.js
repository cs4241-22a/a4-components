import Name from './Name';
import AddName from './AddName';

const NamesList = ({
	names,
	handleAddName,
	handleDeleteName,
}) => {
	return (
		<div className='names-list'>
			{names.map((name) => (
				<Name
					id={name.id}
					text={name.text}
					date={name.date}
					handleDeleteName={handleDeleteName}
				/>
			))}
			<AddName handleAddName={handleAddName} />
		</div>
	);
};

export default NamesList;

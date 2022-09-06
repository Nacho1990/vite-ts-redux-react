import { Person } from '@/models';
import { addFavorite } from '@/redux/states';
import { AppStore } from '@/redux/store';
import { Checkbox } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


export interface PeopleTableInterface {}

const PeopleTable: React.FC<PeopleTableInterface> = () => {
	const [selectedPeople, setSelectedPeople] = React.useState<Person[]>([])
	const dispatch = useDispatch();
	const statePeople = useSelector((store: AppStore) => store.people )
	const favoritePeople = useSelector((store: AppStore) => store.favorites )

	const findPerson = (person: Person) => !!favoritePeople.find(p => p.id === person.id)
	const filterPerson = (person: Person) => favoritePeople.filter(p => p.id !== person.id)

	const handleChange = (person: Person) => {
		const filteredPeople = findPerson(person) ? filterPerson(person) : [...selectedPeople, person];
		dispatch(addFavorite(filteredPeople))
		setSelectedPeople(filteredPeople);
	}

	const columns = [
		{
			field: 'actions',
			headerName: '',
			type: 'actions',
			sortable: false,
			width: 50,
			renderCell: (params: GridRenderCellParams) => <>{
				<Checkbox 
					size='small'
					checked={findPerson(params.row)}
					onChange={() => handleChange(params.row)}
				/>
			}</>
		},
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
			minWidth: 150,
			renderCell: (params: GridRenderCellParams) => <>{params.value}</>
		},
		{
			field: 'category',
			headerName: 'Category',
			flex: 1,
			minWidth: 150,
			renderCell: (params: GridRenderCellParams) => <>{params.value}</>
		},
		{
			field: 'company',
			headerName: 'Company',
			flex: 1,
			minWidth: 150,
			renderCell: (params: GridRenderCellParams) => <>{params.value}</>
		},
		{
			field: 'levelOfHappiness',
			headerName: 'Level Of Happiness',
			flex: 1,
			minWidth: 150,
			renderCell: (params: GridRenderCellParams) => <>{params.value}</>
		},
	]

	React.useEffect(() => {
		setSelectedPeople(favoritePeople)
	}, [favoritePeople])

	return (
		<DataGrid
			rows={statePeople}
			columns={columns}
			disableColumnSelector
			disableSelectionOnClick
			autoHeight
			pageSize={5}
			rowsPerPageOptions={[5]}
			getRowId={(row: any) => row.id}
		/>
	)
};

export default PeopleTable;

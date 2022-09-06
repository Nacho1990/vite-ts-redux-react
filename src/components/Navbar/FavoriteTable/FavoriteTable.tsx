import { Person } from '@/models';
import { addFavorite, removeFavorite } from '@/redux/states';
import { AppStore } from '@/redux/store';
import { Checkbox, IconButton } from '@mui/material';
import { GridRenderCellParams, DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';


export interface FavoriteTableInterface {}

const FavoriteTable: React.FC<FavoriteTableInterface> = () => {
	const dispatch = useDispatch();
	const stateFavorites = useSelector((store: AppStore) => store.favorites )

	const handleClick = (person: Person) => {		
		dispatch(removeFavorite(person));
	};

	const columns = [
		{
			field: 'actions',
			headerName: '',
			type: 'actions',
			sortable: false,
			width: 50,
			renderCell: (params: GridRenderCellParams) => <>{
				<IconButton 
            color="secondary" 
            aria-label="favorites" 
            component="label"
            onClick={() => handleClick(params.row)}
          >
            <DeleteIcon />
          </IconButton>
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

	return (
		<DataGrid
			rows={stateFavorites}
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

export default FavoriteTable;


import React from 'react';
import {
	Card,
	CardContent,
	CardActions,
	IconButton,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import { Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles(theme => ({
	card: {
		display: 'flex',
		justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2
	},
}));

const Idea = ({ id, title, keyNum }) => {
	const classes = useStyles();
	return (
		<Draggable draggableId={keyNum} index={id}>
			{provided => (
				<Card
					className={classes.card}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<CardContent>
						<Typography>{title}</Typography>
					</CardContent>
					<CardActions>
						<IconButton>
							<CheckIcon color="primary"/>
						</IconButton>
						<IconButton>
							<DeleteIcon color="error"/>
						</IconButton>
					</CardActions>
				</Card>
			)}
		</Draggable>
	);
};

export default Idea;

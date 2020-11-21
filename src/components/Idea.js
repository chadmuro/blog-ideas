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

const useStyles = makeStyles({
	card: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});

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
							<CheckIcon />
						</IconButton>
						<IconButton>
							<DeleteIcon />
						</IconButton>
					</CardActions>
				</Card>
			)}
		</Draggable>
	);
};

export default Idea;

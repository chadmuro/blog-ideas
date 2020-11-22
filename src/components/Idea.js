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
import { DeleteIdea, ToggleCompleted } from '../firebase/useFirestore';

const useStyles = makeStyles(theme => ({
	card: {
		display: 'flex',
		justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2
	},
	completed: {
		textDecoration: 'line-through',
		opacity: .7
	}
}));

const Idea = ({ id, title, completed, index }) => {
	const classes = useStyles();

	const handleCompleteClick = () => {
		ToggleCompleted(id, completed);
	}

	return (
		<Draggable draggableId={id} index={index}>
			{provided => (
				<Card
					className={classes.card}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<CardContent>
						{completed ? <Typography className={classes.completed}>{title}</Typography> : <Typography>{title}</Typography>}
					</CardContent>
					<CardActions>
						<IconButton onClick={handleCompleteClick}>
							<CheckIcon color="primary" />
						</IconButton>
						<IconButton onClick={() => DeleteIdea(id)}>
							<DeleteIcon color="error" />
						</IconButton>
					</CardActions>
				</Card>
			)}
		</Draggable>
	);
};

export default Idea;

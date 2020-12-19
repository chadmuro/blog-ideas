import React, { useContext } from 'react';
import {
	Card,
	CardContent,
	CardActions,
	IconButton,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Draggable } from 'react-beautiful-dnd';
import { DeleteIdea, MoveIdea } from '../firebase/useFirestore';
import { AuthContext } from '../contexts/AuthContext';


const useStyles = makeStyles(theme => ({
	card: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 2,
	},
	idea: {
		flex: 1,
		justifySelf: 'flex-start',
	},
	completed: {
		textDecoration: 'line-through',
		opacity: 0.7,
		flex: 1,
		justifySelf: 'flex-start',
	},
}));

const Idea = ({ id, title, stage, index }) => {
	const classes = useStyles();
	const { userInfo } = useContext(AuthContext);

	const nextStage = () => {
		console.log('next stage');
		if (stage === 'ideas') {
			MoveIdea(id, userInfo.uid, 'drafts', new Date().getTime());
		}
		if (stage === 'drafts') {
			MoveIdea(id, userInfo.uid, 'published', new Date().getTime());
		}
	};

	const prevStage = () => {
		console.log('prev stage');
		if (stage === 'drafts') {
			MoveIdea(id, userInfo.uid, 'ideas', new Date().getTime());
		}
		if (stage === 'published') {
			MoveIdea(id, userInfo.uid, 'drafts', new Date().getTime());
		}
	};

	const editIdea = () => {
		console.log('edit or delete idea');
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
					<CardActions>
						<IconButton size="small" onClick={editIdea}>
							<EditIcon color="secondary" fontSize="small" />
						</IconButton>
					</CardActions>
					{/* {stage === 'published' && (
						<Typography className={classes.completed}>{title}</Typography>
					)} */}
					{stage === 'published' && (
						<Typography className={classes.completed}>{title}</Typography>
					)}

					{stage !== 'published' && (
						<Typography className={classes.idea}>{title}</Typography>
					)}
					<CardActions>
						{/* <IconButton onClick={() => DeleteIdea(id, userInfo.uid)}>
							<DeleteIcon color="error" />
						</IconButton> */}

						{stage !== 'ideas' && (
							<IconButton size="small" onClick={prevStage}>
								<NavigateBeforeIcon color="primary" />
							</IconButton>
						)}

						{stage !== 'published' && (
							<IconButton size="small" onClick={nextStage}>
								<NavigateNextIcon color="primary" />
							</IconButton>
						)}
					</CardActions>
				</Card>
			)}
		</Draggable>
	);
};

export default Idea;

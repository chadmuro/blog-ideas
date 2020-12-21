import React, { useState, useContext } from 'react';
import {
	Card,
	CardActions,
	IconButton,
	Typography,
	makeStyles,
	TextField,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import { Draggable } from 'react-beautiful-dnd';
import { DeleteIdea, MoveIdea, UpdateIdea } from '../firebase/useFirestore';
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
	const [editIdea, setEditIdea] = useState(false);
	const [updatedIdea, setUpdatedIdea] = useState(title);
	const classes = useStyles();
	const { userInfo } = useContext(AuthContext);

	const nextStage = () => {
		if (stage === 'ideas') {
			MoveIdea(id, userInfo.uid, 'drafts', new Date().getTime());
		}
		if (stage === 'drafts') {
			MoveIdea(id, userInfo.uid, 'published', new Date().getTime());
		}
	};

	const prevStage = () => {
		if (stage === 'drafts') {
			MoveIdea(id, userInfo.uid, 'ideas', new Date().getTime());
		}
		if (stage === 'published') {
			MoveIdea(id, userInfo.uid, 'drafts', new Date().getTime());
		}
	};

	const handleUpdate = () => {
		UpdateIdea(id, userInfo.uid, updatedIdea);
		setEditIdea(false);
	};

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
						<IconButton size="small" onClick={() => setEditIdea(!editIdea)}>
							{editIdea && <CloseIcon fontSize="small" />}
							{!editIdea && <EditIcon color="secondary" fontSize="small" />}
						</IconButton>
					</CardActions>
					{stage === 'published' &&
						(editIdea ? (
							<TextField
								className={classes.idea}
								value={updatedIdea}
								onChange={e => setUpdatedIdea(e.target.value)}
							/>
						) : (
							<Typography className={classes.completed}>{title}</Typography>
						))}

					{stage !== 'published' &&
						(editIdea ? (
							<TextField
								className={classes.idea}
								value={updatedIdea}
								onChange={e => setUpdatedIdea(e.target.value)}
							/>
						) : (
							<Typography className={classes.idea}>{title}</Typography>
						))}
					<CardActions>
						{editIdea && (
							<>
								<IconButton size="small" onClick={handleUpdate}>
									<CheckIcon color="primary" fontSize="small" />
								</IconButton>
								<IconButton
									size="small"
									onClick={() => DeleteIdea(id, userInfo.uid)}
								>
									<DeleteIcon color="error" fontSize="small" />
								</IconButton>
							</>
						)}

						{!editIdea && stage === 'published' && (
							<IconButton size="small" onClick={prevStage}>
								<NavigateBeforeIcon color="primary" fontSize="small" />
							</IconButton>
						)}
						{!editIdea && stage === 'ideas' && (
							<IconButton size="small" onClick={nextStage}>
								<NavigateNextIcon color="primary" fontSize="small" />
							</IconButton>
						)}
						{!editIdea && stage === 'drafts' && (
							<>
								<IconButton size="small" onClick={prevStage}>
									<NavigateBeforeIcon color="primary" fontSize="small" />
								</IconButton>
								<IconButton size="small" onClick={nextStage}>
									<NavigateNextIcon color="primary" fontSize="small" />
								</IconButton>
							</>
						)}
					</CardActions>
				</Card>
			)}
		</Draggable>
	);
};

export default Idea;

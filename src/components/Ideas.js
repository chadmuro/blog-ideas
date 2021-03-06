import React, { useContext } from 'react';
import { Container, Typography, makeStyles } from '@material-ui/core';
import { Droppable } from 'react-beautiful-dnd';
import Idea from './Idea';
import { IdeasContext } from '../contexts/IdeasContext';

const useStyles = makeStyles(theme => ({
	container: {
		margin: theme.spacing(2, 0, 0, 0),
	},
	title: {
		marginBottom: theme.spacing(2),
	},
}));

const Ideas = () => {
	const classes = useStyles();
	const { ideas } = useContext(IdeasContext);

	return (
		<Droppable droppableId="ideas">
			{provided => (
				<Container
					className={classes.container}
					ref={provided.innerRef}
					{...provided.droppableProps}
					maxWidth="xs"
				>
					<Typography variant="h5" align="center" className={classes.title}>
						Ideas
					</Typography>
					{ideas.ideas.map((idea, index) => (
						<Idea
							id={idea.id}
							index={index}
							key={idea.id}
							title={idea.idea}
							stage={idea.stage}
						/>
					))}
					{provided.placeholder}
				</Container>
			)}
		</Droppable>
	);
};

export default Ideas;

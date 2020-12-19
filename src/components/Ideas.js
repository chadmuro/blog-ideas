import React, { useContext } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Droppable } from 'react-beautiful-dnd';
import Idea from './Idea';
import { IdeasContext } from '../contexts/IdeasContext';

const useStyles = makeStyles(theme => ({
	container: {
		margin: theme.spacing(2, 0, 0, 0),
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
					{ideas.ideas.map((idea, index) => (
						<Idea
							id={idea.id}
							index={index}
							key={idea.id}
							title={idea.idea}
							completed={idea.completed}
						/>
					))}
					{provided.placeholder}
				</Container>
			)}
		</Droppable>
	);
};

export default Ideas;

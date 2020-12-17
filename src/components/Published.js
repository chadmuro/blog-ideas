import React, { useContext } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Droppable } from 'react-beautiful-dnd';
import Idea from './Idea';
import { PublishedContext } from '../contexts/PublishedContext';

const useStyles = makeStyles(theme => ({
	container: {
		margin: theme.spacing(2, 0, 0, 0),
	},
}));

const Published = () => {
	const classes = useStyles();
	const { published } = useContext(PublishedContext);

	return (
		<Droppable droppableId="ideas">
			{provided => (
				<Container
					maxWidth="xs"
					className={classes.container}
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					{published.map((idea, index) => (
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

export default Published;

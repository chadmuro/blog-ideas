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

const Drafts = () => {
	const classes = useStyles();
	const { ideas } = useContext(IdeasContext);

	return (
		<Droppable droppableId="drafts">
			{provided => (
				<Container
                    maxWidth="xs"
					className={classes.container}
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					{ideas.drafts.map((idea, index) => (
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

export default Drafts;

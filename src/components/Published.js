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

const Published = () => {
	const classes = useStyles();
	const { ideas } = useContext(IdeasContext);

	return (
		<Droppable droppableId="published">
			{provided => (
				<Container
					maxWidth="xs"
					className={classes.container}
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<Typography variant="h5" align="center" className={classes.title}>
						Published
					</Typography>
					{ideas.published.map((idea, index) => (
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

export default Published;

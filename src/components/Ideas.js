import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Droppable } from 'react-beautiful-dnd';
import Idea from './Idea';

const useStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(2, 0, 0, 0)
    }
}));

const sampleData = [
	{ title: 'first one', key: 'one', id: 1 },
	{ title: 'second one', key: 'two', id: 2 },
	{ title: 'third one', key: 'three', id: 3 }
];

const Ideas = () => {
	const classes = useStyles();

	return (
		<Droppable droppableId="ideas">
			{provided => (
				<Container className={classes.container} ref={provided.innerRef} {...provided.droppableProps}>
					{sampleData.map(idea => <Idea id={idea.id} keyNum={idea.key} key={idea.key} title={idea.title} />)}
                    {provided.placeholder}
				</Container>
			)}
		</Droppable>
	);
};

export default Ideas;

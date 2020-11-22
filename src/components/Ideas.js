import React, { useContext } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Droppable } from 'react-beautiful-dnd';
import Idea from './Idea';
import { AuthContext } from '../contexts/AuthContext';
import { GetIdeas } from '../firebase/useFirestore';

const useStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(2, 0, 0, 0)
    }
}));

const Ideas = () => {
	const classes = useStyles();
	const userInfo = useContext(AuthContext);

	const { ideas } = GetIdeas();

	return (
		<Droppable droppableId="ideas">
			{provided => (
				<Container className={classes.container} ref={provided.innerRef} {...provided.droppableProps}>
					{ideas.map((idea, index) => <Idea id={idea.id} index={index} key={idea.id}  title={idea.idea} completed={idea.completed}/>)}
                    {provided.placeholder}
				</Container>
			)}
		</Droppable>
	);
};

export default Ideas;

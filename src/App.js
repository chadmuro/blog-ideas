import React, { useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import Header from './components/Header';
import Ideas from './components/Ideas';
import Drafts from './components/Drafts';
import Published from './components/Published';
import AuthModal from './components/AuthModal';
import { AuthContext } from './contexts/AuthContext';
import { IdeasContext } from './contexts/IdeasContext';
import { MoveIdea } from './firebase/useFirestore';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			alignItems: 'center',
		},
	},
}));

const App = () => {
	const { userInfo } = useContext(AuthContext);
	const { ideas, setIdeas } = useContext(IdeasContext);
	const classes = useStyles();

	const onDragEnd = result => {
		const { destination, source, draggableId } = result;
		if (!destination) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		let start = source.droppableId;
		let end = destination.droppableId;

		// if idea is in the same column
		if (start === end) {
			const newTaskList = ideas[start].map(idea => {
				return idea;
			});

			// create new timestamp
			let newTimestamp;
			const destinationTimestamp = ideas[end][destination.index].createdAt;

			if (destination.index === 0) {
				newTimestamp = destinationTimestamp + 1000;
			}
			if (destination.index === ideas[end].length - 1) {
				newTimestamp = destinationTimestamp - 1000;
			}

			if (
				source.index < destination.index &&
				destination.index < ideas[end].length - 1
			) {
				newTimestamp =
					Math.ceil(
						destinationTimestamp + ideas[end][destination.index + 1].createdAt
					) / 2;
			}

			if (source.index > destination.index && destination.index !== 0) {
				newTimestamp =
					Math.floor(
						destinationTimestamp + ideas[end][destination.index - 1].createdAt
					) / 2;
			}

			const newTask = {
				...ideas[start][source.index],
				createdAt: newTimestamp,
				stage: end,
			};

			newTaskList.splice(source.index, 1);
			newTaskList.splice(destination.index, 0, newTask);

			// update state first to have smooth animation
			if (start === 'ideas') {
				setIdeas({
					...ideas,
					ideas: newTaskList,
				});
			}
			if (start === 'drafts') {
				setIdeas({
					...ideas,
					drafts: newTaskList,
				});
			}
			if (start === 'published') {
				setIdeas({
					...ideas,
					published: newTaskList,
				});
			}

			// update database
			MoveIdea(
				draggableId,
				userInfo.uid,
				destination.droppableId,
				newTimestamp
			);
		} else {
			// if idea is moved to a new column
			const startTaskList = ideas[start].map(idea => {
				return idea;
			});
			const endTaskList = ideas[end].map(idea => {
				return idea;
			});

			// create new timestamp
			let newTimestamp;

			if (ideas[end].length === 0) {
				newTimestamp = ideas[start][source.index].createdAt;
			} else {
				if (destination.index === 0) {
					newTimestamp = ideas[end][destination.index].createdAt + 1000;
				}
				if (destination.index === ideas[end].length) {
					newTimestamp = ideas[end][destination.index - 1].createdAt - 1000;
				}

				if (
					destination.index !== ideas[end].length &&
					destination.index !== 0
				) {
					newTimestamp =
						Math.ceil(
							ideas[end][destination.index].createdAt +
								ideas[end][destination.index - 1].createdAt
						) / 2;
				}
			}

			const newTask = {
				...ideas[start][source.index],
				createdAt: newTimestamp,
				stage: end,
			};

			startTaskList.splice(source.index, 1);
			endTaskList.splice(destination.index, 0, newTask);

			// update state first to have smooth animation
			if (start === 'ideas') {
				if (end === 'drafts') {
					setIdeas({
						...ideas,
						ideas: startTaskList,
						drafts: endTaskList,
					});
				}
				if (end === 'published') {
					setIdeas({
						...ideas,
						ideas: startTaskList,
						published: endTaskList,
					});
				}
			}
			if (start === 'drafts') {
				if (end === 'ideas') {
					setIdeas({
						...ideas,
						drafts: startTaskList,
						ideas: endTaskList,
					});
				}
				if (end === 'published') {
					setIdeas({
						...ideas,
						drafts: startTaskList,
						published: endTaskList,
					});
				}
			}
			if (start === 'published') {
				if (end === 'drafts') {
					setIdeas({
						...ideas,
						published: startTaskList,
						drafts: endTaskList,
					});
				}
				if (end === 'ideas') {
					setIdeas({
						...ideas,
						published: startTaskList,
						ideas: endTaskList,
					});
				}
			}

			// update database
			MoveIdea(
				draggableId,
				userInfo.uid,
				destination.droppableId,
				newTimestamp
			);
		}
	};

	return (
		<div className="App">
			{!userInfo && <AuthModal />}
			{userInfo && (
				<>
					<Header />
					<DragDropContext onDragEnd={onDragEnd}>
						<div className={classes.container} >
							<Ideas />
							<Drafts />
							<Published />
						</div>
					</DragDropContext>
				</>
			)}
		</div>
	);
};

export default App;

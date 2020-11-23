import React, { useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Header from './components/Header';
import Ideas from './components/Ideas';
import AuthModal from './components/AuthModal';
import { AuthContext } from './contexts/AuthContext';
import { IdeasContext } from './contexts/IdeasContext';
import { MoveIdea } from './firebase/useFirestore';

const App = () => {
	const userInfo = useContext(AuthContext);
	const { ideas, setIdeas } = useContext(IdeasContext);
	

	const onDragEnd = result => {
		const completedList = ideas.filter(idea => idea.completed === true);
		const incompletedList = ideas.filter(idea => idea.completed === false);
		console.log(result);
		console.log(incompletedList);

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

		// check if draggable item is completed => no change
		if (source.index >= incompletedList.length) {
			return;
		} else {
			// create new list
			const newTaskList = ideas.map(idea => {
				return idea;
			});

			// create new timestamp to update firebase in correct order
			let newTimestamp;
			const destinationTimestamp =
				ideas[destination.index].createdAt.seconds * 1000;

			if (destination.index === 0) {
				newTimestamp = new Date(destinationTimestamp + 1000);
			}
			if (destination.index >= incompletedList.length - 1) {
				newTimestamp = new Date(ideas[incompletedList.length - 1].createdAt.seconds * 1000 - 1000);
			}

			if (
				source.index < destination.index &&
				destination.index < incompletedList.length - 1
			) {
				newTimestamp = new Date(
					Math.ceil(
						destinationTimestamp +
							ideas[destination.index + 1].createdAt.seconds * 1000
					) / 2
				);
			}

			if (source.index > destination.index && destination.index !== 0) {
				newTimestamp = new Date(
					Math.floor(
						destinationTimestamp +
							ideas[destination.index - 1].createdAt.seconds * 1000
					) / 2
				);
			}

			const newTask = {
				...ideas[source.index],
				createdAt: newTimestamp,
			};

			newTaskList.splice(source.index, 1);
			newTaskList.splice(destination.index, 0, newTask);

			MoveIdea(draggableId, newTask.createdAt);
			setIdeas(newTaskList);
		}	
	};

	return (
		<div className="App">
			{userInfo && (
				<>
					<Header />
					<DragDropContext onDragEnd={onDragEnd}>
						<Ideas />
					</DragDropContext>
				</>
			)}
			{!userInfo && <AuthModal />}
		</div>
	);
};

export default App;

import React, { useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Header from './components/Header';
import Ideas from './components/Ideas';
import Drafts from './components/Drafts';
import Published from './components/Published';
import AuthModal from './components/AuthModal';
import { AuthContext } from './contexts/AuthContext';
import { IdeasContext } from './contexts/IdeasContext';
import { MoveIdea } from './firebase/useFirestore';

const App = () => {
	const { userInfo } = useContext(AuthContext);
	const { ideas, setIdeas } = useContext(IdeasContext);

	const onDragEnd = result => {
		const incompletedList = ideas.filter(idea => idea.completed === false);

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

		console.log(result, ideas);



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
			const destinationTimestamp = ideas[destination.index].createdAt;

			if (destination.index === 0) {
				newTimestamp = destinationTimestamp + 1000;
			}
			if (destination.index >= incompletedList.length - 1) {
				newTimestamp = ideas[incompletedList.length - 1].createdAt - 1000;
			}

			if (
				source.index < destination.index &&
				destination.index < incompletedList.length - 1
			) {
				newTimestamp =
					Math.ceil(
						destinationTimestamp + ideas[destination.index + 1].createdAt
					) / 2;
			}

			if (source.index > destination.index && destination.index !== 0) {
				newTimestamp =
					Math.floor(
						destinationTimestamp + ideas[destination.index - 1].createdAt
					) / 2;
			}

			const newTask = {
				...ideas[source.index],
				createdAt: newTimestamp,
			};

			newTaskList.splice(source.index, 1);
			newTaskList.splice(destination.index, 0, newTask);

			MoveIdea(draggableId, destination.droppableId, newTask.createdAt);
			setIdeas(newTaskList);
		}
	};

	return (
		<div className="App">
			{!userInfo && <AuthModal />}
			{userInfo && (
				<>
					<Header />
					<DragDropContext onDragEnd={onDragEnd}>
						<div style={{display: 'flex', justifyContent: 'center'}}>
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

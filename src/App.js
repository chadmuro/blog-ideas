import React, { useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Header from './components/Header';
import Ideas from './components/Ideas';
import AuthModal from './components/AuthModal';
import { AuthContext } from './contexts/AuthContext';
import { IdeasContext } from './contexts/IdeasContext';

const App = () => {
	const userInfo = useContext(AuthContext);
	const { ideas, setIdeas } = useContext(IdeasContext);

	const onDragEnd = result => {
		const { destination, source } = result;
		if (!destination) {
			return;
		}
		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		const newTaskList = ideas.map((idea, index) => {
			return idea;
		})

		newTaskList.splice(source.index, 1);
		newTaskList.splice(destination.index, 0, {...ideas[source.index]});

		setIdeas(newTaskList);
	};

	return (
		<div className="App">
			{!userInfo && <AuthModal />}
			{userInfo && (
				<>
					<Header />
					<DragDropContext onDragEnd={onDragEnd}>
						<Ideas />
					</DragDropContext>
				</>
			)}
		</div>
	);
};

export default App;

import React from 'react';
import Header from './components/Header';
import Ideas from './components/Ideas';
import { DragDropContext } from 'react-beautiful-dnd';

const App = () => {
  const onDragEnd = result => {
    console.log(result);
  }

	return (
		<div className="App">
			<Header />
			<DragDropContext onDragEnd={onDragEnd}>
				<Ideas />
			</DragDropContext>
		</div>
	);
};

export default App;

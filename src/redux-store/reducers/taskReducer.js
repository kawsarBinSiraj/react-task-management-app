// initialState
const initialState = {
	tasks: [],
};

// Use the initialState as a default value
function taskReducer(state = initialState, action) {
	// The reducer normally looks at the action type field to decide what happens
	switch (action.type) {
		case 'ADD_TASK':
			let newTasks = state.tasks;
			newTasks.push(action.payload);
			return {
				...state,
				tasks: newTasks,
			};
		case 'EDIT_TASK':
			let { id, ...rest } = action.payload;
			let editedTasks = state.tasks.map((task) => task.id === id ? { id, ...rest } : { ...task })
			return {
				...state,
				tasks: editedTasks
			};
		case 'DELETE_TASK':
			let tId = action.payload;
			return {
				...state,
				tasks: state.tasks.filter((t) => t.id !== tId),
			};
		case 'DELETE_ALL_TASK':
			return {
				...state,
				tasks: []
			};

		default:
			// If this reducer doesn't recognize the action type, or doesn't
			// care about this specific action, return the existing state unchanged
			return state;
	}
}

export default taskReducer;

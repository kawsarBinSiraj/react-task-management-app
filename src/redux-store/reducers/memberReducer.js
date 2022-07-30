// initialState
const initialState = {
	members: [],
};

// Use the initialState as a default value
function memberReducer(state = initialState, action) {
	// The reducer normally looks at the action type field to decide what happens
	switch (action.type) {
		case 'ADD_MEMBER':
			let newMembers = state.members;
			newMembers.push(action.payload);
			return {
				...state,
				members: newMembers,
			};
		case 'EDIT_MEMBER':
			let { id, ...rest } = action.payload;
			let editedMembers = state.members.map((member) => member.id === id ? { id, ...rest } : { ...member })
			return {
				...state,
				members: editedMembers
			};
		case 'DELETE_MEMBER':
			let mId = action.payload;
			return {
				...state,
				members: state.members.filter((m) => m.id !== mId),
			};
		case 'DELETE_All_MEMBER':
			return {
				...state,
				members: [],
			};

		default:
			// If this reducer doesn't recognize the action type, or doesn't
			// care about this specific action, return the existing state unchanged
			return state;
	}
}

export default memberReducer;

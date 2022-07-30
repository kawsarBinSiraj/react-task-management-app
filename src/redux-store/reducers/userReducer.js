
// initialState
const initialState = {
	user: {},
};

// Use the initialState as a default value
function userReducer(state = initialState, action) {
	// The reducer normally looks at the action type field to decide what happens
	switch (action.type) {
		case 'USER_LOGIN':
			return {
				...state,
				user: action.payload,
			};
		case 'USER_LOGOUT':
			return {
				...state,
				user: {}
			};

		default:
			// If this reducer doesn't recognize the action type, or doesn't
			// care about this specific action, return the existing state unchanged
			return state;
	}
}

export default userReducer;

const INITIAL_STATE = {
    currentUser: null
}

// The reducer takes in two arguments, the current state that the user is in 
// and an action that has the type and the payload.
const userReducer = (currentState = INITIAL_STATE, action) => {
	switch(action.type) {
		// if the type is to set the current user
		case 'SET_CURRENT_USER': 
			// then we return a new object, note here that we can modify
			// currentState but we choose to send a new object instead
			// because a new object means the component that receives it
			// as a prop must be remounted
			return {
				...currentState, 
				currentUser: action.payload
			}
		default: 
			// This doesn't remount the component
			return currentState;
	}
};

export default userReducer;
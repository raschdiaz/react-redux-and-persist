// Initial State
const initialState = {
    role: {},
};

// Reducers (Modifies The State And Returns A New State)
const roleReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ROLE_GET_SUCCESS": {
            console.log("ROLE_GET_SUCCESS", action);
            return {
                ...state,
                role: action.response.payload
            }
        }
        // Default
        default: {
            return state;
        }
    }
};

// Exports
export default roleReducer;
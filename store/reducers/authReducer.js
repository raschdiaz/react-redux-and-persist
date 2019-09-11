// Initial State
const initialState = {
  loggedIn: false,
  response: null,
  userList: [],
};

// Reducers (Modifies The State And Returns A New State)
const authReducer = (state = initialState, action) => {
  console.log("action", action);
  console.log("-------------------");
  switch (action.type) {
    // Logged In
    case 'LOGGED_IN': {
      return {
        // State
        ...state,
        // Redux Store
        loggedIn: action.payload,
      }
    }
    case "USER_LOGIN_SUCCESS": {
      return {
        ...state,
        response: action.response
      }
    }
    case "ADD_USER": {
      let newUserList = [...state.userList];
      newUserList.push(action.user);
      return {
        ...state,
        userList: newUserList
      }
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default authReducer;
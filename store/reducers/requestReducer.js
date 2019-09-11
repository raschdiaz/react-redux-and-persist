const initialState = {
  queue: [],
  currentAction: {},
};

export default function requestReducer(state = initialState, action) {
  let newState = {
    ...state,
    currentAction: {},
  };
  let queue = newState.queue.slice(0); // clone array before modifying it
  const actionToModify = action.payload;
  switch (action.type) {
    case 'REQUEST':
      // Queue all requests
      newState = {
        ...newState,
        queue: [...queue, actionToModify],
        currentAction: actionToModify,
      };
      return newState;
    case 'RESPONSE':
      // loop through every item in local storage and filter out the successful request
      queue = queue.filter(request => JSON.stringify(request) !== JSON.stringify(action.payload));
      newState = {
        ...newState,
        queue,
      };
      return newState;
    default:
      return newState;
  }
}

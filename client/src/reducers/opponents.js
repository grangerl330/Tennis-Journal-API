export default (state = [], action) => {
  switch(action.type) {
    case 'SET_OPPONENTS':
      return action.opponents
    default:
      return state
  }
}

const createStore = function (reducer) {
  let currentState = {}
  let observers = []  
  const getState = () => {
    return currentState;
  }
  const dispatch = (action) => {
    currentState = reducer(currentState,action)
    observers.forEach(fn => fn()) 
  }
  const subscribe = (fn) =>{
    observers.push(fn)
  }
  dispatch({ type: '@init' })
  return { getState, subscribe, dispatch }
}


export default createStore
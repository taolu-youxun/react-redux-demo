import './App.css';
import createStore from './store';
import Provider from './Provider';
import Mine from './Mine';
import reducers from './reducer';

const logger = store => next => action => {    
  console.log('log1')    
 next(action)     
}

const thunk = store => next =>action => {
  console.log('thunk')        
  return typeof action === 'function' ? action(store.dispatch) : next(action)
}

const logger2 = store => next => action => {    
  console.log(action,'log2')    
  next(action)    
}

function compose(fns) {
  if (fns.length === 0) return arg => arg    
  if (fns.length === 1) return fns[0]
  return fns.reduce((res,cur)=>{
    return (...args)=>{
      return res(cur(...args))
    }
  })
}

const applyMiddleware = (...middlewares) => createStore => reducer => {    
  const store = createStore(reducer)    
  let { getState, dispatch } = store    
  const params = {      
      getState,      
      dispatch: (action) => dispatch(action)      
      //解释一下这里为什么不直接 dispatch: dispatch      
      //因为直接使用dispatch会产生闭包,导致所有中间件都共享同一个dispatch,如果有中间件修改了dispatch或者进行异步dispatch就可能出错    
  }    

  const middlewareArr = middlewares.map(middleware =>{
    return middleware(params)
  }) 
  console.log(compose(middlewareArr))
  dispatch = compose(middlewareArr)(dispatch)
  return { ...store, dispatch }
}


const store = createStore(reducers,applyMiddleware( logger,thunk,logger2 ));


function App() {
  return (
    <Provider store={store}>
      <Mine/>
    </Provider>
  );
}

export default App;

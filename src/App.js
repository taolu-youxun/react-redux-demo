import './App.css';
import createStore from './store';
import Provider from './Provider';
import Mine from './Mine';
import reducers from './reducer';

function App() {
  return (
    <Provider store={createStore(reducers)}>
      <Mine/>
    </Provider>
  );
}

export default App;

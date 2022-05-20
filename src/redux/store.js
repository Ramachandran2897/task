import * as redux from 'redux'
import RootReducer from './rootReducer';
 
const store = redux.createStore(RootReducer);
export default store; 
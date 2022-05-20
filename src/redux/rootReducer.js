import * as redux from 'redux'
import UserDataReducer from './selectedData/reducer';

const RootReducer = redux.combineReducers({
        listData: UserDataReducer
    })
export default RootReducer;

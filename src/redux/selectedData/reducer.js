import { Add_Data, Remove_Data } from "./type";
const UserDataReducer = (state = [], action) => {
    switch (action.type) {
        case Add_Data:
            return action.payload;
            break;
        case Remove_Data:
            return action.payload;
            break;
        default:
            return state;
    }
}

export default UserDataReducer;
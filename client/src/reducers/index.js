import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import postReducer from './postReducer';
import errorReducer from './errorReducer';
import msgReducer from './msgReducer';
import authReducer from './authReducer';
import petReducer from './petReducer';
import breedReducer from './breedReducer';
import ageReducer from './ageReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
    item: itemReducer,
    post: postReducer,
    error: errorReducer,
    msg: msgReducer,
    auth: authReducer,
    pet: petReducer,
    breed: breedReducer,
    age: ageReducer,
    category: categoryReducer
});
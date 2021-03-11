import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import postReducer from './postReducer';
import commentReducer from './commentReducer';
import errorReducer from './errorReducer';
import msgReducer from './msgReducer';
import authReducer from './authReducer';
import petReducer from './petReducer';
import breedReducer from './breedReducer';
import ageReducer from './ageReducer';
import categoryReducer from './categoryReducer';
import twoFactorAuthReducer from './twoFactorAuthReducer';
import contactsReducer from './contactsReducer';

export default combineReducers({
    item: itemReducer,
    post: postReducer,
    comment: commentReducer,
    error: errorReducer,
    msg: msgReducer,
    auth: authReducer,
    pet: petReducer,
    breed: breedReducer,
    age: ageReducer,
    category: categoryReducer,
    twoFactorAuth: twoFactorAuthReducer,
    contacts: contactsReducer
});
import axios from 'axios';
import { GET_AGES, AGES_LOADING, GET_ITEMS} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from   './errorActions';

export const getAges = () => dispatch => {
    dispatch(setAgesLoading());
    axios
    .get('/api/ages')
    .then(res => 
        dispatch({
            type: GET_AGES,
            payload: res.data
        }))
    .catch(err => 
        dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setAgesLoading = () => {
    return {
        type: AGES_LOADING
    };
};

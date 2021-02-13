import axios from 'axios';
import { GET_PETS, ADD_PET, DELETE_PET, PETS_LOADING, GET_PET} from '../actions/types';
import { tokenConfig } from './authActions';
import { returnErrors } from   './errorActions';

export const getPets = () => dispatch => {
    dispatch(setPetsLoading());
    axios
    .get('/api/pets')
    .then(res => 
        dispatch({
            type: GET_PETS,
            payload: res.data
        }))
    .catch(err => 
        dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getPet = (id) => dispatch => {
    dispatch(setPetsLoading());
    axios
    .get(`/api/pets/${id}`)
    .then(res => 
        dispatch({
            type: GET_PET,
            payload: res.data
        }))
    .catch(err => 
        dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addPet = (pet) => (dispatch, getState) => {
    axios
    .post('/api/pets', pet, tokenConfig(getState))
    .then(res => 
        dispatch({
            type: ADD_PET,
            payload: res.data
        }))
    .catch(err => 
        dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deletePet = (id) => (dispatch, getState)=> {
    axios
    .delete(`/api/pets/${id}`, tokenConfig(getState))
    .then(res => 
        dispatch({
            type: DELETE_PET,
            payload: id
        }))
    .catch(err => 
        dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setPetsLoading = () => {
    return {
        type: PETS_LOADING
    };
};

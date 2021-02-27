import axios from 'axios';
import { GET_BREEDS, ADD_BREED, DELETE_BREED, BREEDS_LOADING, ADD_BREED_FAIL, DELETE_FAIL } from '../actions/types';
import { tokenConfig } from './authActions';
import { returnErrors } from   './errorActions';
import { returnMsgs } from './msgActions';

export const getBreeds = () => dispatch => {
    dispatch(setBreedsLoading());
    axios
    .get('/api/breeds')
    .then(res => 
        dispatch({
            type: GET_BREEDS,
            payload: res.data
        }))
    .catch(err => 
        dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addBreed = (breed) => (dispatch, getState) => {
    axios
    .post('/api/breeds', breed, tokenConfig(getState))
    .then(res => {
        dispatch(
            returnMsgs('נוסף בהצלחה', null, 'ADD_BREED_SUCCESS')
          );
        dispatch({
            type: ADD_BREED,
            payload: res.data
        })
    })
    .catch(err => { 
        dispatch(
            returnErrors(err.response.data.msg, err.response.status, 'ADD_BREED_FAIL')
        );
        dispatch({
            type: ADD_BREED_FAIL
        });
    });
};

export const deleteBreed = (id) => (dispatch, getState)=> {
    axios
    .delete(`/api/breeds/${id}`, tokenConfig(getState))
    .then(res => 
        dispatch({
            type: DELETE_BREED,
            payload: id
        }))
    .catch(err => {
        dispatch(returnErrors(err.response.data.msg, err.response.status,'DELETE_FAIL'));
        dispatch({
            type: DELETE_FAIL
        });
    });
};

export const setBreedsLoading = () => {
    return {
        type: BREEDS_LOADING
    };
};

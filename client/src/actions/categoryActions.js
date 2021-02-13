import axios from 'axios';
import { ADD_CATEGORY_FAIL, GET_CATEGORYS, ADD_CATEGORY, DELETE_CATEGORY, CATEGORYS_LOADING, DELETE_FAIL} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from   './errorActions';
import { returnMsgs } from './msgActions';


export const getCategories = () => dispatch => {
    dispatch(setCategoriesLoading());
    axios
    .get('/api/categories')
    .then(res => 
        dispatch({
            type: GET_CATEGORYS,
            payload: res.data
        }))
    .catch(err => 
        dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addCategory = (category) => (dispatch, getState) => {
    axios
    .post('/api/categories', category, tokenConfig(getState))
    .then(res => {
        dispatch(
            returnMsgs('נוסף בהצלחה', null, 'ADD_CATEGORY_SUCCESS')
          );
          dispatch({
            type: ADD_CATEGORY,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch(
            returnErrors(err.response.data.msg, err.response.status, 'ADD_CATEGORY_FAIL')
        );
        dispatch({
            type: ADD_CATEGORY_FAIL
        });
    });
};

export const deleteCategory = (id) => (dispatch, getState)=> {
    axios
    .delete(`/api/categories/${id}`, tokenConfig(getState))
    .then(res => 
        dispatch({
            type: DELETE_CATEGORY,
            payload: id
        }))
    .catch(err => {
        dispatch(returnErrors(err.response.data.msg, err.response.status,'DELETE_FAIL'));
        dispatch({
            type: DELETE_FAIL
        });
    });
};

export const setCategoriesLoading = () => {
    return {
        type: CATEGORYS_LOADING
    };
};

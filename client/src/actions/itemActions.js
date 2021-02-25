import axios from 'axios';
import { EDIT_ITEM_FAIL, ADD_ITEM_FAIL, ADD_ITEM_SUCCESS, GET_ITEMS, GET_ITEM, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, ITEM_LOADING, RATING_ITEM, GET_MINMAXPRICE, VIEWS_ITEM, EDIT_ITEM } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { returnMsgs } from './msgActions';

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios
        .get('/api/items')
        .then(res =>
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const getItem = (id) => dispatch => {
    dispatch(setItemsLoading());
    axios
        .get(`/api/items/${id}`)
        .then(res =>
            dispatch({
                type: GET_ITEM,
                payload: res.data
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const getMinMaxPrice = () => dispatch => {
    axios
        .get('/api/items/minmaxprice')
        .then(res =>
            dispatch({
                type: GET_MINMAXPRICE,
                payload: res.data
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const getFilterItems = ({ name, price, pet, breed, age, category, rating }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // Request body
        const body = JSON.stringify({ name, price, pet, breed, age, category, rating });

    dispatch(setItemsLoading());
    axios
        .post('/api/items/filter', body, config)
        .then(res =>
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const addItem = (item) => (dispatch, getState) => {
    axios
        .post('/api/items', item, tokenConfig(getState))
        .then(res => {
            dispatch(
                returnMsgs('המוצר נוסף בהצלחה', null, 'ADD_ITEM_SUCCESS')
            );
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(
                returnErrors(err.response.data.msg, err.response.status, 'ADD_ITEM_FAIL')
            );
            dispatch({
                type: ADD_ITEM_FAIL
            });
        });
};

export const deleteItem = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/items/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_ITEM,
                payload: id
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const editItem = (id, item) => (dispatch, getState) => {
    axios
        .post(`/api/items/edit/${id}`, item, tokenConfig(getState))
        .then(res => {
            dispatch(
                returnMsgs('המוצר נערך בהצלחה', null, 'EDIT_ITEM_SUCCESS')
            );
            dispatch({
                type: EDIT_ITEM,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(
                returnErrors(err.response.data.msg, err.response.status, 'EDIT_ITEM_FAIL')
            );
            dispatch({
                type: EDIT_ITEM_FAIL
            });
        });
};

export const ratingItem = (_id, rating) => (dispatch, getState) => {

    // Request body
    const body = JSON.stringify({ rating });

    dispatch(setItemsLoading());
    axios
        .post(`/api/items/rating/${_id}`, body, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: RATING_ITEM,
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const viewsItem = (_id) => (dispatch, getState) => {

    // Request body
    const body = JSON.stringify({});
    axios
        .post(`/api/items/views/${_id}`, body, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: VIEWS_ITEM,
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};

export const setItemLoading = () => {
    return {
        type: ITEM_LOADING
    };
};

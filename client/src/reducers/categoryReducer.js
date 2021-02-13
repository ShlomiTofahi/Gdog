import { GET_CATEGORYS, ADD_CATEGORY, DELETE_CATEGORY, CATEGORYS_LOADING, } from '../actions/types';

const initialState = {
    categories: [],
    loading: false
};

export default function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORYS:
            return {
                ...state,
                categories: action.payload,
                loading: false
            };
        case ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload],
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(categories => categories._id !== action.payload)
            };
        case CATEGORYS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
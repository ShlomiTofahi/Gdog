import { GET_AGES, AGES_LOADING} from '../actions/types';

const initialState = {
    ages: [],
    loading: false
}; 

export default function ageReducer(state = initialState, action ) {
    switch (action.type) {
        case GET_AGES:
            return {
                ...state,
                ages: action.payload,
                loading: false
            };
        case AGES_LOADING:
        return {
            ...state,
            loading: true
            }
            default:
            return state;
    }
}
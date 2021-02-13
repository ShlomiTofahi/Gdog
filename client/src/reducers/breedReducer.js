import { GET_BREEDS, ADD_BREED, DELETE_BREED, BREEDS_LOADING} from '../actions/types';

const initialState = {
    breeds: [],
    loading: false
}; 

export default function breedReducer(state = initialState, action ) {
    switch (action.type) {
        case GET_BREEDS:
            return {
                ...state,
                breeds: action.payload,
                loading: false
            };
            case ADD_BREED:
                return {
                    ...state,
                    breeds: [...state.breeds, action.payload]
                };
            case DELETE_BREED:
                return {
                    ...state,
                    breeds: state.breeds.filter(breed => breed._id !== action.payload)
                };
                case BREEDS_LOADING:
                return {
                    ...state,
                    loading: true
                }
            default:
            return state;
    }
}
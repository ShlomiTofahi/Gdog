import { GET_PETS, ADD_PET, DELETE_PET, PETS_LOADING, GET_PET} from '../actions/types';

const initialState = {
    pets: [],
    pet: null,
    loading: false
}; 

export default function petReducer(state = initialState, action ) {
    switch (action.type) {
        case GET_PETS:
            return {
                ...state,
                pets: action.payload,
                loading: false
        };
        case GET_PET:
            return {
                ...state,
                pet: action.payload,
                loading: false
        };
        case ADD_PET:
            return {
                ...state,
                pets: [action.payload, ...state.pets]
            };
        case DELETE_PET:
            return {
                ...state,
                pets: state.pets.filter(pet => pet._id !== action.payload)
            };
            case PETS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
        return state;
    }
}
import { GET_ITEMS, GET_ITEM, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, ITEM_LOADING, RATING_ITEM, GET_MINMAXPRICE, VIEWS_ITEM, EDIT_ITEM} from '../actions/types';

const initialState = {
    items: [],
    loading: false,
    minmaxprice: null,
    item: null
}; 

export default function itemReducer(state = initialState, action ) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case GET_ITEM:
            return {
                ...state,
                item: action.payload,
                loading: false
            };
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            };
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            };
            case EDIT_ITEM:
                let newItems = [...state.items];  
                 var index = newItems.findIndex(element => element._id === action.payload._id );
                 newItems[index] = action.payload;
                return {
                    ...state,
                    items:  newItems
                };
        case RATING_ITEM:
        case VIEWS_ITEM:
            return {
                ...state
            };
        case GET_MINMAXPRICE:
            return {
                ...state,
                minmaxprice:action.payload                
            };
        case ITEMS_LOADING:
        case ITEM_LOADING:
        return {
            ...state,
            loading: true
        }
        default:
        return state;
    }
}
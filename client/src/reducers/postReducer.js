import { GET_POSTS, GET_ITEM, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, ITEM_LOADING, RATING_ITEM, GET_MINMAXPRICE, VIEWS_ITEM, EDIT_ITEM} from '../actions/types';

const initialState = {
    posts: [],
    loading: false,
    post: null
}; 

export default function postReducer(state = initialState, action ) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        // case GET_ITEM:
        //     return {
        //         ...state,
        //         item: action.payload,
        //         loading: false
        //     };
        // case ADD_ITEM:
        //     return {
        //         ...state,
        //         items: [action.payload, ...state.items]
        //     };
        // case DELETE_ITEM:
        //     return {
        //         ...state,
        //         items: state.items.filter(item => item._id !== action.payload)
        //     };
        //     case EDIT_ITEM:
        //         let newItems = [...state.items];  
        //          var index = newItems.findIndex(element => element._id === action.payload._id );
        //          newItems[index] = action.payload;
        //         return {
        //             ...state,
        //             items:  newItems
        //         };
        // case RATING_ITEM:
        // case VIEWS_ITEM:
        //     return {
        //         ...state
        //     };
        // case ITEMS_LOADING:
        // case ITEM_LOADING:
        // return {
        //     ...state,
        //     loading: true
        // }
        default:
        return state;
    }
}
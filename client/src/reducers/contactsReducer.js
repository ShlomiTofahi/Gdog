import {  MAIL_SEND, MAIL_SEND_FAIL } from '../actions/types';

const initialState = {
};

export default function contactsReducer(state = initialState, action) {
    switch (action.type) {
        case MAIL_SEND:
        case MAIL_SEND_FAIL:
            return {
                ...state
            };
        default:
            return state;
    }
}
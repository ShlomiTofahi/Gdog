import axios from 'axios';
import { returnErrors } from './errorActions';
import { returnMsgs } from './msgActions';

import {
    MAIL_SEND, MAIL_SEND_FAIL
} from './types';



export const sendMail = (data) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // Request body
    // const body = JSON.stringify({ email });

    axios
        .post('/api/contacts/mail-sending', data, config)
        .then(res => {
            dispatch(
                data.isHaircut ?
                returnMsgs('תודה שבחרת להסתפר אצלנו, בקשה לתור למספרה נשלחה, נחזור אלייך בהקדם!', null, 'MAIL_SEND')
                : returnMsgs('תודה רבה, המייל נשלח בהצלחה!', null, 'MAIL_SEND')
            );
            dispatch({
                type: MAIL_SEND,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(
                returnErrors(err.response.data.msg, err.response.status, 'MAIL_SEND_FAIL')
            );
            dispatch({
                type: MAIL_SEND_FAIL
            });
        });
};








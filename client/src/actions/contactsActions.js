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
              returnMsgs('', null, 'SEND_MAIL_SUCCESS')
          );
          dispatch({
              type: MAIL_SEND,
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








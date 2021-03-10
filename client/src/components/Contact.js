import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Container, Input, FormGroup, Form, Alert } from 'reactstrap';
import ReactWhatsapp from 'react-whatsapp';
import axios from 'axios';

import { sendMail } from '../actions/contactsActions';
import { clearErrors } from '../actions/errorActions';
import { clearMsgs } from '../actions/msgActions';

import { Icon, InlineIcon } from '@iconify/react';
import petsIcon from '@iconify-icons/dashicons/pets';

class Contact extends Component {

    state = {
        title: '',
        name: '',
        phone: '',
        email: '',
        message: '',

        msg: null,
        msgAlery: '',
        visible: true
    };

    static protoType = {
        error: PropTypes.object.isRequired,
        msg: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
        clearMsgs: PropTypes.func.isRequired,
        sendMail: PropTypes.func.isRequired
    }


    componentDidUpdate(prevProps) {
        const { error, msg } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'SEND_MAIL_FAIL') {
                this.setState({
                    msg: error.msg,
                    msgAlery: 'danger'
                });
            } else {
                this.setState({ msg: null });
            }
        }
        if (msg && msg.id === 'SEND_MAIL_SUCCESS') {
            this.setState({
                property: msg.msg,
                propertyAlery: 'info',
            })

            // Clear errors
            this.props.clearErrors();
            // Clear msgs
            this.props.clearMsgs();
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = async e => {
        e.preventDefault();

        const { name, title, email, phone, message } = this.state;
        const data = {
            name,
            title,
            phone,
            email,
            message
        };

        // this.props.sendMail(data);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('title', title);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('message', message);

        const res = await axios.post('/send-mail', formData, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    onDismiss = () => {
        this.setState({
            visible: false
        })
    }

    aboutStyle = () => {
        return {
            border: '1px solid rgb(230, 230, 230)',
            webkitBorderRadius: '15px',
            mozBorderRadius: '15px',
            borderRadius: '15px',
            marginTop: '30px',
            padding: '30px',

            webkitBoxShadow: '0 0 5px 0.1px #C7C7C7',
            boxSshadow: '0 0 5px 0.1px #C7C7C7'
        };
    };

    imgStyle = () => {
        return {
            // border: '1px solid rgb(230, 230, 230)',
            width: '90%',
            display: 'inline',
            webkitBorderRadius: '35px',
            mozBorderRadius: '35px',
            borderRadius: '35px',
            opacity: '0.9',

        };
    };

    render() {
        return (
            <div class='contact-fullpage' align='right'>
                <Container className='mt-4 mb-4'>
                    <h1 class="brand"><span><strong>GDog</strong></span><Icon icon={petsIcon} /> | Contact Us</h1>
                    {this.state.msg ? <Alert color={this.state.msgAlery} isOpen={this.state.visible} toggle={this.onDismiss}>{this.state.msg}</Alert>
                        : null}
                    <div class="wrapper animated bounceInLeft">
                        <div class="company-info">
                            <h3>לפרטים נוספים והזמנות:</h3>
                            <ul class='pb-5 pr-0 pr-xl-3 text-right'>
                                <li><i class="fa fa-road"></i> משה רבנו 164</li>
                                <a href="tel:0502130027" style={{ display: 'block' }} class='contact-btn'>
                                    <li><i class="fa fa-phone"></i> 050-213-0027</li>
                                </a>
                                <a href="mailto: topdogs5551@gmail.com" class='contact-btn'>
                                    <li><i class="fa fa-envelope"></i> topdogs5551@gmail.com</li>
                                </a>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                                    </svg>
                                    <ReactWhatsapp number="972-050-213-0027" message="?מה שלומך" element='a' class='contact-btn' href="#"> הודעת וואטסאפ</ReactWhatsapp>
                                </li>
                                <br />עקבו אחרינו
                            <br />
                                <a class='contact-btn' href='https://www.facebook.com/GDog-103459404977944/?ref=page_internal' target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-facebook ml-2" viewBox="0 0 16 16">
                                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                    </svg>
                                </a>
                                <a class='contact-btn' href='https://www.instagram.com/topdogs101010' target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                    </svg>
                                </a>
                            </ul>

                            <img style={this.imgStyle()} src='/images/contact.jpg' alt='' />
                        </div>
                        <div class="contact">
                            <h1 style={{ color: '#7c6f5a7a' }}>נשמח לשמוע ממכם, ולהיות לשירוכם!</h1>
                            <h3 class='mb-4'>שלח לנו מייל:</h3>
                            {/* {{ msg }} */}
                            {/* <form method="POST" action="send"> */}
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup className='contact-form'>
                                    <p>
                                        <label>שם</label>
                                        <Input onChange={this.onChange} type="text" name="name" />
                                    </p>
                                    <p>
                                        <label>נושא</label>
                                        <Input onChange={this.onChange} type="text" name="title" />
                                    </p>
                                    <p>
                                        <label>כתובת דוא"ל</label>
                                        <Input onChange={this.onChange} type="email" name="email" />
                                    </p>
                                    <p>
                                        <label>מספר טלפון</label>
                                        <Input onChange={this.onChange} type="text" name="phone" />
                                    </p>
                                    <p class="full">
                                        <label>הודעה</label>
                                        <textarea onChange={this.onChange} name="message" rows="5"></textarea>
                                    </p>
                                    <p class="full">
                                        <button type="submit">שלח</button>
                                    </p>
                                    {/* </form> */}
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default connect(
    null,
    { sendMail, clearErrors, clearMsgs }
)(Contact);
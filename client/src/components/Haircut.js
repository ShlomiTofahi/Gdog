import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Row, Col, Container, Input, FormGroup, Form, Alert, ButtonDropdown, DropdownToggle, DropdownMenu,
    DropdownItem
} from 'reactstrap';
import ReactWhatsapp from 'react-whatsapp';
import axios from 'axios';

import { sendMail } from '../actions/contactsActions';
import { clearErrors } from '../actions/errorActions';
import { clearMsgs } from '../actions/msgActions';

import { Icon, InlineIcon } from '@iconify/react';
import petsIcon from '@iconify-icons/dashicons/pets';

class Haircut extends Component {

    state = {
        dropDownPetValue: 'בחר חיית מחמד',
        dropdownPetOpen: false,
        isHaircut: true,

        sendingType: '',
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        pet: '',
        breed: '',
        allergies: '',
        lastHaircutDate: '',
        notes: '',

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
            if (error.id === 'MAIL_SEND_FAIL') {
                this.setState({
                    msg: error.msg,
                    msgAlery: 'danger'
                });
            }
            // else {
            //     this.setState({ msg: null });
            // }
        }
        if (msg && msg.id === 'MAIL_SEND') {
            this.setState({
                msg: msg.msg,
                msgAlery: 'info',
            })

            // Clear errors
            this.props.clearErrors();
            // Clear msgs
            this.props.clearMsgs();
        }
    }

    onChange = e => {
        let { name, email, phone, pet, breed, lastHaircutDate, allergies, date, time, notes } = this.state;

        const whatsappMsg = {
            name,
            email,
            phone,
            pet,
            breed,
            lastHaircutDate,
            allergies,
            date,
            time,
            notes,
        };
        whatsappMsg[e.target.name] = e.target.value;

        let message = `
            *יש לך תור חדש למספרה*
            *פרטי קשר:*
            שם: ${whatsappMsg.name}
            אימייל: ${whatsappMsg.email}
            טלפון: ${whatsappMsg.phone}

            *פרטי חיית המחמד:*
            חיית מחמד: ${whatsappMsg.pet}
            גזע: ${whatsappMsg.breed}
            תאריך אחרון שיסתפר: ${whatsappMsg.lastHaircutDate}
            אלרגיות: ${whatsappMsg.allergies}

            *פרטי התור:*
            תאריך: ${whatsappMsg.date}
            שעה: ${whatsappMsg.time}
            הערות: ${whatsappMsg.notes}
          `;
        this.setState({
            message
        });

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = async e => {
        e.preventDefault();
        const { name, email, phone, pet, breed, lastHaircutDate, allergies, date, time,
            notes, isHaircut, sendingType } = this.state;

        if (sendingType === 'email') {
            let message = `
            <p>יש לך תור חדש למספרה</p>
            <h3>פרטי קשר:</h3>
            <ul>  
              <li>שם: ${name}</li>
              <li>אימייל: ${email}</li>
              <li>טלפון: ${phone}</li>
            </ul>
            <h3>פרטי חיית המחמד:</h3>
            <ul>  
              <li>חיית מחמד: ${pet}</li>
              <li>גזע: ${breed}</li>
              <li>תאריך אחרון שיסתפר: ${lastHaircutDate}</li>
              <li>אלרגיות: ${allergies}</li>
            </ul>
            <h3>פרטי התור:</h3>
            <ul>  
              <li>תאריך: ${date}</li>
              <li>שעה: ${time}</li>
            </ul>
            <h2>הערות: ${notes} </h2>
          `;
            const data = {
                email,
                message,
                isHaircut
            };
            this.props.sendMail(data);
        } else if (sendingType === 'whatsapp') {
            this.setState({
                msg: 'תודה שבחרת להסתפר אצלנו, בקשה לתור למספרה נשלחה, נחזור אלייך בהקדם!',
                msgAlery: 'info',
            })
        }
    }
    DropDowntogglePet = () => {
        this.setState({
            dropdownPetOpen: !this.state.dropdownPetOpen
        });
    }
    selectPet = (event) => {
        this.setState({
            dropdownPetOpen: !this.state.dropdownPetOpen,
            dropDownPetValue: event.target.innerText,
            [event.target.name]: event.target.innerText
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
        const sendingBtn = this.state.sendingType === 'whatsapp' ?
            <button type="submit">
                <i class="fa fa-whatsapp" />
                <ReactWhatsapp onClick={this.onSubmit} number="972-050-213-0027" message={this.state.message} element='a' class='contact-btn' href="#">
                    &nbsp;שלח הודעת וואטסאפ
                     </ReactWhatsapp>
            </button> : this.state.sendingType === 'call' ?
                <button>
                    <a href="tel:0502130027" style={{ display: 'block' }} class='contact-btn'>
                        <i class="fa fa-phone" /> בצע שיחה
                    </a>
                </button>
                : this.state.sendingType === 'email' ?
                    <button type="submit"><i class="fa fa-envelope" /> שלח הודעת מייל</button>
                    : null



        return (
            <div class='haircut-fullpage' align='right'>
                <Container className='mt-4 mb-4'>
                    <h1 class="brand"><span><strong>GDog</strong></span><Icon icon={petsIcon} /> | hairdresser's</h1>
                    <div class="wrapper animated bounceInLeft">
                        <div class="haircut-info">
                            <h3 class='text-right'>בחר צורת שליחה</h3>
                            <label class="haircut-container">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                                </svg> שליחת מייל
                                <input onChange={this.onChange} type="radio" name="sendingType" defaultValue='email' />
                                <span class="haircut-checkmark"></span>
                            </label>
                            <label class="haircut-container">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                                </svg> שליחת וואטסאפ
                                <input onChange={this.onChange} type="radio" name="sendingType" defaultValue='whatsapp' />
                                <span class="haircut-checkmark"></span>
                            </label>
                            <label class="haircut-container">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-telephone-fill pb-1" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                </svg> התקשר
                                <input onChange={this.onChange} type="radio" name="sendingType" defaultValue='call' />
                                <span class="haircut-checkmark"></span>
                            </label>
                        </div>
                        <div class="haircut">
                            <h3 class='mb-4' style={{ color: '#7c6f5a7a' }}>קביעת תור למספרה</h3>
                            {this.state.msg ? <Alert color={this.state.msgAlery} isOpen={this.state.visible} toggle={this.onDismiss}>{this.state.msg}</Alert>
                                : null}
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup className='haircut-form'>
                                    <Row>
                                        <Col xs="12" sm="6" md="6" xl="6" className='mb-4'>
                                            <h5 class='mb-4'>פרטים אישיים</h5>
                                            <p>
                                                <label>שם מלא</label>
                                                <Input onChange={this.onChange} type="text" name="name" />
                                            </p>
                                            <p>
                                                <label>כתובת דוא"ל</label>
                                                <Input onChange={this.onChange} type="email" name="email" />
                                            </p>
                                            <p>
                                                <label>מספר טלפון</label>
                                                <Input onChange={this.onChange} type="number" name="phone" />
                                            </p>
                                        </Col>
                                        <Col xs="12" sm="6" md="6" xl="6" className='mb-4'>
                                            <h5 class='mb-4'>פרטי חיית המחמד</h5>
                                            <p>
                                                <ButtonDropdown
                                                    size='sm'
                                                    isOpen={this.state.dropdownPetOpen} toggle={this.DropDowntogglePet}>
                                                    <DropdownToggle caret>{this.state.dropDownPetValue}</DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem name='pet' value='dog' onClick={this.selectPet}>כלב</DropdownItem>
                                                        <DropdownItem name='pet' value='cat' onClick={this.selectPet}>חתול</DropdownItem>
                                                    </DropdownMenu>
                                                </ButtonDropdown>
                                            </p>
                                            <p>
                                                <label>גזע</label>
                                                <Input onChange={this.onChange} type="text" name="title" />
                                            </p>
                                            <p>
                                                <label>תאריך אחרון שיסתפר</label>
                                                <Input onChange={this.onChange} type="date" name="title" />
                                            </p>
                                            <p>
                                                <label>אלרגיות מסויימות</label>
                                                <textarea onChange={this.onChange} name="allergies" rows="1"></textarea>
                                            </p>
                                        </Col>
                                    </Row>
                                    <h5>פרטי התור</h5><br />
                                    <Row>
                                        <Col>
                                        <p>
                                            <label>תאריך</label>
                                            <Input onChange={this.onChange} type="date" name="date" />
                                        </p>
                                        </Col>
                                        <Col>

                                        <p>
                                            <label>שעה</label>
                                            <Input onChange={this.onChange} type="time" name="time" />
                                        </p>
                                        </Col>

                                    </Row>
                                    <p class="full">
                                        <label>הערות</label>
                                        <textarea onChange={this.onChange} name="message" rows="2"></textarea>
                                    </p>
                                    <p class="full">
                                        {sendingBtn}
                                    </p>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    error: state.error,
    msg: state.msg
});

export default connect(
    mapStateToProps,
    { sendMail, clearErrors, clearMsgs }
)(Haircut);
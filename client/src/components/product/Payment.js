import React, { Component } from 'react'
import { Row, Col, Container } from 'reactstrap';
import peopleCommunity20Filled from '@iconify-icons/fluent/people-community-20-filled';

import { Icon, InlineIcon } from '@iconify/react';
import cutIcon from '@iconify-icons/whh/cut';
import combIcon from '@iconify-icons/si-glyph/comb';
import shopIcon from '@iconify-icons/entypo/shop';
import petsIcon from '@iconify-icons/dashicons/pets';

export default class Payment extends Component {

    aboutStyle = () => {
        return {
            border: '1px solid rgb(230, 230, 230)',
            webkitBorderRadius: '15px',
            mozBorderRadius: '15px',
            borderRadius: '15px',
            marginTop: '10%',
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
        };
    };
    render() {
        return (
            <div class='payment-fullpage' align='right'>
                <Container className='mt-4 mb-4'>
                    <h1 class="brand"><span><strong>GDog</strong></span><Icon icon={petsIcon} /> | Payment</h1>
                    <div class="wrapper animated bounceInLeft">
                        <div class="payment-info">
                            <h3>דגשים חשובים</h3>
                            <ul class='mr-2' style={{ listStyleType: 'circle' }}>
                                <li>העברת התשלום למספר 050-2130027</li>
                                <li>יש לציין את קוד הפריט בתיאור העברה</li>
                            </ul>
                        </div>
                        <div class="payment">
                            <div align="right" style={this.aboutStyle()}>
                                <fieldset>
                                    <h2 class='display-4' style={window.innerWidth >= 992 ? { color: '#8a5e5e', opacity: '0.4' } : { color: '#4d7448', opacity: '0.4', fontSize: '2.0em' }}>
                                        התשלום מתבצע דרך ביט</h2>
                                    <Row>

                                        <p class='lead'>
                                            מה זה bit?<br />אפליקצייה להעברת כספים כולל קבוצות.

                                        </p>
                                        <a class=' text-center' href='https://www.poalimsites.co.il/bit/index.html' target="_blank">
                                            <img style={petfoodStyle} src='/images/bit-icon.png' alt='' />
                                            {/* <span class='lead d-block'>שקי אוכל ברמה גבוה</span> */}
                                        </a>
                                    </Row>

                                </fieldset>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>


        )
    }
}
const iconStyle = {
    position: 'relative',
    // letf: '50%',
    // right: '35%',
    opacity: '0.8',
    marginBottom: '25px'
}
const petfoodStyle = {
    // letf: '50%',
    // right: '35%',
    width: '20%',
}
const aboutTextStyle = {
    webkitColumnCount: '2',
    mozColumCount: '2',
    columnCount: '2',
    columnGap: '40px'
}
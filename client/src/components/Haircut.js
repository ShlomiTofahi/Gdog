import React, { Component } from 'react'
import { Row, Col, Container } from 'reactstrap';

export default class About extends Component {

    aboutStyle = () => {
        return {
            border: '1px solid rgb(230, 230, 230)',
            borderRadius: '5%',
            marginTop: '30px',
            padding: '30px',

            webkitBoxShadow: '0 0 5px 0.1px #C7C7C7',
            boxSshadow: '0 0 5px 0.1px #C7C7C7'
        };
    };
    imgStyle = () => {
        return {
            border: '1px solid rgb(230, 230, 230)',
            width: '90%',
            display: 'inline',
            borderRadius: '10%'
        };
    };
    render() {
        return (
            <Container className='mb-5'>
                <div align="right" style={this.aboutStyle()}>
                    <fieldset>
                        <legend><h1 class='display-4' style={{ color: '#7c6f5a7a' }}>חייג לפרטים</h1></legend>
                        <Row>
                            <Col xs="12" sm="12" md="6" className='pt-4' >

                                <p class='lead'>
                                </p>
                            </Col>
                        </Row>
                    </fieldset>
                </div>
            </Container>
        )
    }
}

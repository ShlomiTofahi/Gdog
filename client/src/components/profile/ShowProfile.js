import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody, Container, CardFooter,
    CardTitle, CardSubtitle, Button, Badge
} from 'reactstrap';
import { loadUser } from '../../actions/authActions'
import moment from 'moment';

class ShowProfile extends Component {

    static protoType = {
        auth: PropTypes.object,
        isAuthenticated: PropTypes.bool,
        loadUser: PropTypes.func.isRequired
    }

    // componentDidMount() {
    //     this.props.loadUser()
    // }
    frameStyle = () => {
        return {
            border: '1px solid rgb(230, 230, 230)',
            borderRadius: '5%',
            marginTop: '5px',
            padding: '5px',
            webkitBoxShadow: '0 0 5px 0.1px #C7C7C7',
            boxSshadow: '0 0 5px 0.1px #C7C7C7'
        };
    };
    bodyStyle = () => {
        return {
            border: '1px solid rgb(230, 230, 230)',
            borderRadius: '5%',
            padding: '30px',
            height: 'auto',
            webkitBoxShadow: '0 0 5px 0.1px #C7C7C7',
            boxSshadow: '0 0 5px 0.1px #C7C7C7'
        };
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;

        return (
            <Fragment >
                <Container className='mb-5'>
                    <div className='position-relative mt-4' style={this.frameStyle()}>
                        <Card style={this.bodyStyle()} align="right">
                            <div class="items-image pt-4" align="center">
                                <CardImg bottom className='ProductImg' src={user.petImage} alt="תמונה חיית מחמד" />
                            </div>
                            <CardBody className='pr-4 mr-5'>
                                <CardTitle className={'mr-5 mb-2 lead'} tag="h5" style={{ display: 'inline' }}>פרטים אישיים</CardTitle>
                                <Link className='badge badge-pill badge-secondary mb-3 mr-1' to='/profile/edit'>עריכה</Link>
                                <CardSubtitle tag="h6" className="mb-2 text-muted"><spen style={{ color: 'black' }}>שם:</spen> {user.name}</CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted"><spen style={{ color: 'black' }}>אמייל:</spen> {user.email}</CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted"><spen style={{ color: 'black' }}>טלפון:</spen> {user.cellphone}</CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted"><spen style={{ color: 'black' }}>חיית מחמד:</spen> {user.pet.name}</CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted"><spen style={{ color: 'black' }}>גזע:</spen> {user.breed.name}</CardSubtitle>
                                <CardText>
                                    <small className="text-muted">תאריך הרשמה: {moment(user.register_date).format('DD/MM/YYYY')}</small>
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                </Container>
            </Fragment>
        );
    }
}



const mapStateToProps = (state) => ({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { loadUser }
)(ShowProfile);
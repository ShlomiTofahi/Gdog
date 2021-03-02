import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Card, CardBody, Fade, CardTitle, Button, Container, Form, FormGroup, Label,
    Input, Alert, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Row, Col
} from 'reactstrap';
import { Redirect } from "react-router-dom";
import axios from 'axios';

import { edit } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { clearMsgs } from '../../actions/msgActions';
import { getPet } from '../../actions/petActions';

import FileUpload from '../fileupload/FileUpload';
import ChangePassword from './ChangePassword';
import ChangeUserInfo from './ChangeUserInfo';
import ChangeEmail from './ChangeEmail';

class EditProfile extends Component {
    state = {
        path: '/uploads/users/',

        name: '',
        pet: '',
        breed: '',
        cellphone: '',
        petImage: '',
        email: '',
        password: '',

        dropDownValue: 'Select pet',
        dropDownOpen: false,
        currency: '',
        msg: null,
        file: null,
        redirect: null,

        fadeIn: true,
        removeImagefadeIn: false,
        prevPetImage: '',
        imageSubmited: false,
        removedOrginalImageAndNotSave: false,
    };

    static protoType = {
        auth: PropTypes.object,
        pet: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,
        edit: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        clearMsgs: PropTypes.func.isRequired,
        getPet: PropTypes.func.isRequired,
    }

    componentDidMount() {
        const { user } = this.props.auth;
        this.setState({
            name: user.name,
            breed: user.breed.name,
            pet: user.pet.name,
            cellphone: user.cellphone,
            petImage: user.petImage,
            email: user.email,
            prevPetImage: user.petImage

        });

        if (this.state.prevPetImage != '')
            this.setState({ prevPetImage: user.petImage });
    }

    componentDidUpdate(prevProps) {
        const { error, msg, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'EDIT_USER_FAIL') {
                this.setState({
                    msg: error.msg,
                    redirect: null
                });
            } else {
                this.setState({ msg: null });
            }
        }

        //If edited, close modal
        if (!this.state.removedOrginalImageAndNotSave && msg && msg.id === 'EDIT_USER_SUCCESS') {
            this.setState({ redirect: '/profile' });

            // Clear errors
            this.props.clearErrors();
            // Clear msgs
            this.props.clearMsgs();
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        const { name, pet, breed, email, cellphone, petImage, password } = this.state;
        const id = this.props.auth.user._id;

        // Create user object
        const NewUser = {
            name,
            pet,
            breed,
            cellphone,
            petImage,
            email,
            password
        };

        // Attempt to edit
        this.props.edit(id, NewUser);

        //delete prev image
        const noImageFullpath = this.state.path + 'no-image.png';
        if (this.state.petImage != this.state.prevPetImage && this.state.prevPetImage != noImageFullpath) {
            const formData = new FormData();
            formData.append('filepath', this.state.prevPetImage);
            formData.append('abspath', this.state.path);

            axios.post('/remove', formData);
        }
        this.setState({
            imageSubmited: true,
            removedOrginalImageAndNotSave: false
        });
    }

    removedOrginalImageAndNotSave = () => {
        const { name, pet, breed, email, cellphone, petImage, password } = this.state;
        const id = this.props.auth.user._id;

        // Create user object
        const NewUser = {
            name,
            pet,
            breed,
            cellphone,
            petImage,
            email,
            password
        };

        // Attempt to edit
        this.props.edit(id, NewUser);

        const noImageFullpath = this.state.path + 'no-image.png';
        if (this.state.petImage != this.state.prevPetImage && this.state.prevPetImage != noImageFullpath) {
            const formData = new FormData();
            formData.append('filepath', this.state.prevPetImage);
            formData.append('abspath', this.state.path);

            axios.post('/remove', formData);
        }
        this.setState({
            imageSubmited: true,
            removedOrginalImageAndNotSave: true
        });
    }

    DropDowntogglePet = () => {

        this.setState({
            dropdownPetOpen: !this.state.dropdownPetOpen
        });
    }

    DropDowntoggleBreed = () => {

        this.setState({
            dropdownBreedOpen: !this.state.dropdownBreedOpen
        });
    }

    selectPet = (event) => {
        this.props.getPet(event.target.value);
        if (this.state.fadeIn == false) {
            this.setState({ fadeIn: !this.state.fadeIn });
        }
        this.setState({
            dropDownBreedValue: 'בחר גזע',
            breed: '',
            dropdownPetOpen: !this.state.dropdownPetOpen,
            dropDownPetValue: event.target.innerText,
            [event.target.name]: event.target.innerText
        });
    }

    selectBreed = (event) => {
        this.setState({
            dropdownBreedOpen: !this.state.dropdownBreedOpen,
            dropDownBreedValue: event.target.innerText,
            [event.target.name]: event.target.innerText
        });
    }

    setRegisterModalStates = (val) => {
        this.setState({ petImage: val });
    }

    setRegisterModalStates = (val) => {
        this.setState({ petImage: val });
        if (this.state.removeImagefadeIn == false) {
            this.setState({ removeImagefadeIn: !this.state.removeImagefadeIn });
        }
    }

    bodyStyle = () => {
        return {
            border: '1px solid rgb(230, 230, 230)',
            borderRadius: '5%',
            padding: '30px',
            height: 'auto',
            width: '30rem',

            webkitBoxShadow: '0 0 5px 0.1px #C7C7C7',
            boxSshadow: '0 0 5px 0.1px #C7C7C7'
        };
    };

    render() {
        const { pets, pet } = this.props.pet;

        return (
            <Fragment >
                <Container className='mb-5'>
                    <Row >
                        <ChangeUserInfo />
                        <div>
                            <Col>
                                <ChangePassword />
                            </Col>
                            <Col>
                                <ChangeEmail />
                            </Col>
                        </div>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}



const mapStateToProps = (state) => ({
    auth: state.auth,
    pet: state.pet,
    error: state.error,
    msg: state.msg
});

export default connect(
    mapStateToProps,
    { edit, clearErrors, clearMsgs, getPet }
)(EditProfile);
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategories, addBreed } from '../../actions/breedActions';
import { getPets } from '../../actions/petActions';
import { clearErrors } from '../../actions/errorActions';
import { clearMsgs } from '../../actions/msgActions';

class AddBreedModal extends Component {
    state = {
        modal: false,
        name: '',
        pet:this.props.pet
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        msg: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
        clearMsgs: PropTypes.func.isRequired,
        getCategories: PropTypes.func.isRequired
    }

    componentDidMount() {
         //this.props.getPets();
        // this.props.getCategories();
    }

    componentDidUpdate(prevProps) {
        const { error, msg } = this.props;
        if (error !== prevProps.error) {
            // Check for add error
            if (error.id === 'ADD_BREED_FAIL') {
                this.setState({ msg: error.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        //If added category, close modal
        if (this.state.modal) {
            if (msg.id === 'ADD_BREED_SUCCESS') {
                this.toggle();
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();
        // Clear msgs
        this.props.clearMsgs();

        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const newBreed = {
            name: this.state.name,
            pet: this.state.pet
        }
        // Add breed via addBreed action
        this.props.addBreed(newBreed);
        // this.props.getPets();

//         this.setState({
//             name: '',
//         })

        // Close modal
        //this.toggle();
    }


    render() {
        return (
            <div>
                { this.props.isAuthenticated ?
                    <Button outline
                        className='add-element-btn'
                        color='info'
                        size='sm'
                        style={{ marginBottom: '2rem' }}
                        onClick={this.toggle}
                    >הוסף גזע</Button>
                    : <h4 className='mb-3 ml-4'>Please log in to manage items</h4>}


                <Modal
                    align="right"
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    {/* <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader> */}
                    <ModalHeader cssModule={{ 'modal-title': 'w-100 text-center' }} toggle={this.toggle} ><span class="lead">הוספת קטגוריה</span></ModalHeader>

                    <ModalBody>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}



                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='item'>גזע</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='item'
                                    placeholder='הזן שם גזע..'
                                    className='mb-2'
                                    onChange={this.onChange}
                                />
                                <Button
                                    color='dark'
                                    style={{ marginTop: '2rem' }}
                                    block
                                >הוסף</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    msg: state.msg
});

export default connect(
    mapStateToProps,
    { addBreed, clearMsgs, clearErrors, getPets }
)(AddBreedModal);
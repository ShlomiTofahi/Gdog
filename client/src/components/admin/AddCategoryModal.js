import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCategories, addCategory } from '../../actions/categoryActions';
import { clearErrors } from '../../actions/errorActions';
import { clearMsgs } from '../../actions/msgActions';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        msg: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
        clearMsgs: PropTypes.func.isRequired,
        getCategories: PropTypes.func.isRequired
    }
    // componentDidMount() {
    //     // this.props.getPets();
    //     // this.props.getCategories();
    // }
    componentDidUpdate(prevProps) {
        const { error, msg } = this.props;
        if (error !== prevProps.error) {
            // Check for add error
            if (error.id === 'ADD_CATEGORY_FAIL') {
                this.setState({ msg: error.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        //If added category, close modal
        if (this.state.modal) {
            if (msg.id === 'ADD_CATEGORY_SUCCESS') {
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

        const newCategory = {
            name: this.state.name
        }

        // Add category via addCategory action
        this.props.addCategory(newCategory);

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
                    >הוסף קטגוריה</Button>
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
                                <Label for='item'>קטגוריה</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='item'
                                    placeholder='הזן שם קטגוריה..'
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
    { addCategory, clearMsgs, clearErrors }
)(ItemModal);
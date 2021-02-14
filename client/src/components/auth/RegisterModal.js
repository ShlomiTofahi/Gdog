import React, { Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input,Fade,
         NavLink, Alert,ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { getPets, getPet } from '../../actions/petActions';
import FileUpload from '../FileUpload';
import axios from 'axios';
import { Link } from 'react-router-dom';

class RegisterModal extends Component {
    state = {
        path: '/uploads/users/',
        dropDownPetValue: 'בחר חיית מחמד',
        dropDownBreedValue: 'בחר גזע',
        dropDownPetOpen: false,
        dropDownBreedOpen: false,
        currency:'',
        modal: false,
        name: '',
        pet:'',
        breed:'',
        cellphone: '',
        petImage: '',
        email: '',
        password: '',
        msg: null,
        file: null,
        fadeIn:false
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        pet: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        getPet: PropTypes.func.isRequired,
        getPets: PropTypes.func.isRequired
    }    

    componentDidMount() {
        this.props.getPets();
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error) {
            // Check for register error
            if(error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // If authenticated, close modal
        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = e => {
        this.setState( { [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const { name, pet, breed, email,cellphone,petImage, password } = this.state;
        // Create user object
        const NewUser = {
            name,
            pet,
            breed,
            email,
            cellphone,
            petImage,
            password
        };

        // Attempt to register
        this.props.register(NewUser);
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
    selectPet =(event) => {
        this.props.getPet(event.target.value);
        if(this.state.fadeIn==false){
            this.setState({fadeIn:!this.state.fadeIn });
        }
        this.setState({
            dropDownBreedValue: 'בחר גזע',
            breed:'',
          dropdownPetOpen: !this.state.dropdownPetOpen,
          dropDownPetValue: event.target.innerText,
         [event.target.name]: event.target.innerText
        });
      }

      selectBreed =(event) => {
        this.setState({
          dropdownBreedOpen: !this.state.dropdownBreedOpen,
          dropDownBreedValue: event.target.innerText,
         [event.target.name]: event.target.innerText
        });
      }

      setRegisterModalStates = (val) => {
          if(val != '')
            this.setState({petImage : val});
    }

    
    close = () => {
        const noImageFullpath = this.state.path+'no-image.png';
        const filepath = this.state.petImage
        if(filepath !== '' && filepath!=noImageFullpath){
            const formData = new FormData();
            formData.append('filepath', filepath);
            axios.post('/remove', formData);
            this.setState({petImage : ''});
        }
    }

    render() {
        const { pets, pet } = this.props.pet;
        const noImageFullpath = this.state.path+'no-image.png';

        return(
            <div>
                {/* <NavLink className='navlink' style={{float:'right'}} className="Nav-Link lead" onClick={ this.toggle } href='#'>הירשם</NavLink>   */}
                <Link style={{float:'right'}} className={'navlink py-2 nav-link d-md-inline-block lead'}  onClick={ this.toggle } to='#'>הירשם</Link>

                <Modal align="right" isOpen={this.state.modal} toggle={this.toggle} onClosed={this.close}>
                    <ModalHeader cssModule={{'modal-title': 'w-100 text-center'}} toggle={this.toggle}>הרשמה</ModalHeader>
                    <ModalBody>
                         { this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='name'>שם</Label>
                                <Input
                                    type='name'
                                    name='name'
                                    id='name'
                                    placeholder='שם מלא'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label for='email'>אימייל</Label>
                                <Input
                                    type='email'
                                    name='email'
                                    id='email'
                                    placeholder='אימייל'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label for='cellphone'>טלפון</Label>
                                <Input
                                    type='number'
                                    name='cellphone'
                                    id='cellphone'
                                    placeholder='טלפון'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label for='password'>סיסמא</Label>
                                <Input
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='סיסמא'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                            {/* <img src="./images/dog.png" width="100px" alt="dog" onClick={this.selectPet} /> */}
                            {/* <img src="./images/cat.png" width="100px" alt="dog" onClick={this.selectPet} /> */}
                                <ButtonDropdown 
                                    isOpen={this.state.dropdownPetOpen} toggle={this.DropDowntogglePet}>
                                    <DropdownToggle caret>{this.state.dropDownPetValue}</DropdownToggle>
                                    <DropdownMenu
                                     modifiers={{
                                        setMaxHeight: {
                                          enabled: true,
                                          order: 890,
                                          fn: (data) => {
                                            return {
                                              ...data,
                                              styles: {
                                                ...data.styles,
                                                overflow: 'auto',
                                                maxHeight: '100px',
                                              },
                                            };
                                          },
                                        },
                                      }}>
                                        {pets.map(({ name, _id}) => (
                                        <DropdownItem key={_id} name='pet' value={_id} onClick={this.selectPet}>{name}</DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </ButtonDropdown>
                                <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
                                    

                                    <ButtonDropdown 
                                        style={{marginBottom: '2rem'}} 
                                        isOpen={this.state.dropdownBreedOpen} toggle={this.DropDowntoggleBreed}>
                                        <DropdownToggle caret>{this.state.dropDownBreedValue}</DropdownToggle>
                                        <DropdownMenu
                                        modifiers={{
                                            setMaxHeight: {
                                            enabled: true,
                                            order: 890,
                                            fn: (data) => {
                                                return {
                                                ...data,
                                                styles: {
                                                    ...data.styles,
                                                    overflow: 'auto',
                                                    maxHeight: '100px',
                                                },
                                                };
                                            },
                                            },
                                        }}>
                                        { pet &&
                                        pet.breeds.map(({ name }) => (
                                            <DropdownItem name='breed' onClick={this.selectBreed}>{ name }</DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </ButtonDropdown>


                                </Fade>
                                <FileUpload 
                                payload={ this.state.cellphone } 
                                setRegisterModalStates={this.setRegisterModalStates}
                                path={this.state.path}
                                currImage={noImageFullpath}
                                 />

                                <Button
                                    color='dark'
                                    style={{marginTop: '2rem'}}
                                    block
                                >הירשם</Button>
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
    pet:state.pet
});

export default connect(
    mapStateToProps,
     { register, clearErrors, getPets, getPet }
     )(RegisterModal);

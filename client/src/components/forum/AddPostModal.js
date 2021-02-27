import React, { Component } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, CardFooter,
  ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Fade, CardImg, Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

import { addPost } from '../../actions/postActions';
import { clearErrors } from '../../actions/errorActions';
import { clearMsgs } from '../../actions/msgActions';
import { getPet } from '../../actions/petActions';

import FileUpload from '../fileupload/FileUpload';

class AddPostModal extends Component {
  state = {
    path: '/uploads/posts/',
    modal: false,

    title: '',
    body: '',
    pet: '',
    breed: '',
    category: '',
    postImage: '',

    fadeIn: false,
    dropDownCategoryValue: 'בחר קטגוריה',
    dropDownPetValue: 'בחר חיית מחמד',
    dropDownBreedValue: 'בחר גזע',
    dropDownCategoryOpen: false,
    dropDownPetOpen: false,
    dropDownBreedOpen: false,
    editorState: EditorState.createEmpty()
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    pet: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired,
    getPet: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, msg } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'ADD_POST_FAIL') {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    //If added post, close modal
    if (this.state.modal) {
      if (msg.id === 'ADD_POST_SUCCESS') {
        this.toggle();
        this.setState({
          title: '',
          body: '',
          pet: '',
          breed: '',
          category: '',
          postImage: '',
          dropDownCategoryOpen: false,
          dropDownPetOpen: false,
          dropDownBreedOpen: false
        })
      }
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    // Clear msgs
    this.props.clearMsgs();

    this.setState({
      modal: !this.state.modal,
      fadeIn: false,
      dropDownCategoryValue: 'בחר קטגוריה',
      category: '',
      dropDownPetValue: 'בחר חיית מחמד',
      breed: '',
      dropDownBreedValue: 'בחר גזע',
      pet: '',
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();

    const { title, body, category, pet, breed, postImage } = this.state;

    const newPost = {
      title,
      body,
      category,
      pet,
      breed,
      postImage
    }

    this.props.addPost(newPost);
  }

  DropDowntoggleCategory = () => {
    this.setState({
      dropdownCategoryOpen: !this.state.dropdownCategoryOpen
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

  selectCategory = (event) => {
    this.setState({
      dropdownCategoryOpen: !this.state.dropdownCategoryOpen,
      dropDownCategoryValue: event.target.innerText,
      [event.target.name]: event.target.innerText
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
    if (val != '')
      this.setState({ postImage: val });
  }

  close = () => {
    const noImageFullpath = this.state.path + 'no-image.png';
    const filepath = this.state.postImage
    if (filepath !== '' && filepath != noImageFullpath) {
      const formData = new FormData();
      formData.append('filepath', filepath);
      formData.append('abspath', this.state.path);

      axios.post('/remove', formData);
      this.setState({ postImage: '' });
    }
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { pets, pet } = this.props.pet;
    const { categories } = this.props.category;
    const noImageFullpath = this.state.path + 'no-image.png';

    //payload name for item image
    var payload = '';

    return (
      <div>
        { isAuthenticated ?
          <nav align="right" class="mt-3">
            <div style={addPostBorder} class="input-group col-12 col-sm-8 col-md-6 col-lg-5 pr-1 pb-3">
              <CardImg bottom className='forum-pet-image ml-1 mt-1' src={user.petImage} />
              <Input
                style={addPostInput}
                size="lg"
                onClick={this.toggle}
                type="text"
                name='name'
                className="form-control input-lg "
                placeholder={'היי ' + user.name + ', פרסם פוסט...'} />
            </div>
          </nav>

          : <CardFooter className='lead mt-3' style={{ fontSize: '15px' }} align='right'><smalll>היי אורח, התחבר כדי לפרסם פוסט משלך</smalll></CardFooter>}


        <Modal
          align="right"
          isOpen={this.state.modal}
          toggle={this.toggle}
          onClosed={this.close}
        >
          <ModalHeader cssModule={{ 'modal-title': 'w-100 text-center' }} toggle={this.toggle} ><span class="lead">הוספת מוצר למוצרים שלי</span></ModalHeader>
          <ModalBody>
            {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='title'>כותרת</Label>
                <Input
                  type='text'
                  name='title'
                  id='title'
                  placeholder='כותרת'
                  className='mb-2'
                  onChange={this.onChange}
                />
                <Label for='body'>גוף</Label>
                <Input
                  type='text'
                  name='body'
                  id='body'
                  placeholder='גוף'
                  className='mb-2'
                  onChange={this.onChange}
                />

                <ButtonDropdown
                  style={{ marginBottom: '1rem', marginTop: '1rem' }}
                  isOpen={this.state.dropdownCategoryOpen} toggle={this.DropDowntoggleCategory}>
                  <DropdownToggle caret>{this.state.dropDownCategoryValue}</DropdownToggle>
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
                    {categories.map(({ name, _id }) => (
                      <DropdownItem key={_id} name='category' value={_id} onClick={this.selectCategory}>{name}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>

                <ButtonDropdown
                  style={{ display: 'block', marginBottom: '1rem' }}

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
                    {pets.map(({ name, _id }) => (
                      <DropdownItem key={_id} name='pet' value={_id} onClick={this.selectPet}>{name}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>

                <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
                  <ButtonDropdown
                    style={{ marginBottom: '1rem' }}
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
                      {pet &&
                        pet.breeds.map(({ name }) => (
                          <DropdownItem name='breed' onClick={this.selectBreed}>{name}</DropdownItem>
                        ))}
                    </DropdownMenu>
                  </ButtonDropdown>
                </Fade>

                <FileUpload
                  payload={payload}
                  setRegisterModalStates={this.setRegisterModalStates}
                  path={this.state.path}
                  currImage={noImageFullpath}
                />

                <Button
                  color='dark'
                  style={{ marginTop: '2rem' }}
                  block
                >צור פוסט</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const addPostBorder = {
  background: "white",
  color: "#fff",
  height: "100px",
  width: "900px",
  border: '1px solid rgb(230, 230, 230)',

  // margin: "auto 0",
  // padding: "0px 2.5px",
  paddingTop: "20px",
  // borderRadius: "50%",
  // cursor: "pointer",
  // float: "right",
  webkitBoxShadow: '0 0 1px 0.1px #C7C7C7',
  boxSshadow: '0 0 1px 0.1px #C7C7C7',
  webkitBorderRadius: '15px',
  mozBorderRadius: '15px',
  borderRadius: '15px',
};

const addPostInput = {
  background: '#f7f7f7',
  webkitBorderRadius: '20px',
  mozBorderRadius: '20px',
  borderRadius: '20px',
};

const mapStateToProps = state => ({
  post: state.item,
  auth: state.auth,
  error: state.error,
  msg: state.msg,
  pet: state.pet,
  category: state.category
});

export default connect(
  mapStateToProps,
  { addPost, clearErrors, clearMsgs, getPet }
)(AddPostModal);

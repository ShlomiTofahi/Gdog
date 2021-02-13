import React, { Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input,
     ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Fade, Collapse, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../actions/itemActions';
import { clearErrors } from '../actions/errorActions';
import { clearMsgs } from '../actions/msgActions';
import { getPets, getPet } from '../actions/petActions';
import { getCategories } from '../actions/categoryActions';
import { getAges } from '../actions/ageActions';
import FileUpload from './FileUpload';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';

class ItemModal extends Component {
    state = {
        path: '/uploads/items/',
        modal: false,

        name: '',
        price: 0,
        discount: null,
        weight: null,
        description: '',
        pet: '',
        breed: '',
        category: '',
        age: '',
        itemImage:'',

        fadeIn:false,
        dropDownCategoryValue: 'בחר קטגוריה',
        dropDownAgeValue: 'בחר שלב חיים',
        dropDownPetValue: 'בחר חיית מחמד',
        dropDownBreedValue: 'בחר גזע',
        dropDownCategoryOpen: false,
        dropDownAgeOpen: false,
        dropDownPetOpen: false,
        dropDownBreedOpen: false,
        checkedDiscount: false,
        checkedWeight: false,
        editorState: EditorState.createEmpty()
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        msg: PropTypes.object.isRequired,
        pet: PropTypes.object.isRequired,
        addItem: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        getPet: PropTypes.func.isRequired,
        getPets: PropTypes.func.isRequired,
        getCategories: PropTypes.func.isRequired
    }

    componentDidMount() {
        // this.props.getPets();
        // this.props.getCategories();
    }

    componentDidUpdate(prevProps) {
        const { error, msg, isAuthenticated } = this.props;
        if(error !== prevProps.error) {
            // Check for register error
            if(error.id === 'ADD_ITEM_FAIL') {
                this.setState({ msg: error.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        //If authenticated, close modal
        if(this.state.modal) {
            if(msg.id === 'ADD_ITEM_SUCCESS') {
                this.toggle();
                this.setState({
                    name: '',
                    price: 0,
                    discount: null,
                    weight: null,
                    description: '',
                    pet: '',
                    breed: '',
                    category: '',
                    age: '',
                    itemImage:'',
                    dropDownCategoryOpen: false,
                    dropDownAgeOpen: false,
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
            checkedDiscount: false,
            checkedWeight: false,
            discount: null,
            weight: null,
            fadeIn: false,
            dropDownCategoryValue: 'בחר קטגוריה',
            category:'',
            dropDownPetValue: 'בחר חיית מחמד',
            breed:'',
            dropDownBreedValue: 'בחר גזע',
            pet:'',
            dropDownAgeValue: 'בחר שלב חיים',
            age:''
        });
    }

    onChange = e => {
        this.setState( { [e.target.name]: e.target.value });
    }

    // onChangeEditor = (editorState) => this.setState({editorState});

    onSubmit = e => {
        e.preventDefault();

        var { name, price, discount, age, category, pet, breed, weight, description, itemImage } = this.state;
        weight = parseFloat(weight);
        price = parseFloat(price)
        discount = parseFloat(discount)

        const newItem = {
            name,
            price,
            discount,
            weight,
            category,
            pet,
            age,
            breed,
            description,
            itemImage
        }

        // const content = this.state.editorState.getCurrentContent();
        
        // Add item via addItem action
        this.props.addItem(newItem);

        // this.setState({
        //     name: '',
        //     price: 0,
        //     description: '',
        //     age: '',
        //     itemImage:'',
        //     dropDownCategoryOpen: false,
        //     dropDownAgeOpen: false,
        //     dropDownPetOpen: false,
        //     dropDownBreedOpen: false
        // })

            
        // Close modal
        // this.toggle();
    }
    OnCheckedDiscount = () => {
        this.setState({
            checkedDiscount: !this.state.checkedDiscount,
            discount: null
        });
    }
    OnCheckedWeight = () => {
        this.setState({
            checkedWeight: !this.state.checkedWeight,
            weight: null
        });
    }

    DropDowntoggleCategory = () => {
        this.setState({
            dropdownCategoryOpen: !this.state.dropdownCategoryOpen
        });
    }

    DropDowntoggleAge = () => {
        this.setState({
            dropdownAgeOpen: !this.state.dropdownAgeOpen
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

    selectCategory =(event) => {
        this.setState({
          dropdownCategoryOpen: !this.state.dropdownCategoryOpen,
          dropDownCategoryValue: event.target.innerText,
         [event.target.name]: event.target.innerText
        });
      }

    selectAge =(event) => {
        this.setState({
          dropdownAgeOpen: !this.state.dropdownAgeOpen,
          dropDownAgeValue: event.target.innerText,
         [event.target.name]: event.target.innerText
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
            this.setState({itemImage : val});
    } 
    close = () => {
        const noImageFullpath = this.state.path+'no-image.png';
        const filepath = this.state.itemImage
        if(filepath !== '' && filepath!=noImageFullpath){
            const formData = new FormData();
            formData.append('filepath', filepath);
            formData.append('abspath', this.state.path);

            axios.post('/remove', formData);
            this.setState({itemImage : ''});
        }
    }  
    render() {
        const { pets, pet } = this.props.pet;
        const { categories } = this.props.category;
        const { ages } = this.props.age;
        const noImageFullpath = this.state.path+'no-image.png';

        //payload name for item image
        var payload =this.state.price;
        if (this.state.discount)
            payload = payload+this.state.discount;
        if (this.state.weight)
            payload = payload+this.state.weight;

        return(
            <div>
                { this.props.isAuthenticated ?                 
                    <Button outline
                    className='add-item-btn'
                    color='info'
                    size='sm'
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                    >הוסף מוצר</Button> 
                :   null}

                 
                <Modal
                align="right"
                isOpen={this.state.modal}
                toggle={this.toggle}
                onClosed={this.close}
                >
                    <ModalHeader cssModule={{'modal-title': 'w-100 text-center'}} toggle={this.toggle} ><span class="lead">הוספת מוצר למוצרים שלי</span></ModalHeader>
                    <ModalBody>
                    { this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='name'>מוצר</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder='שם המוצר'
                                    className='mb-2'
                                    onChange={this.onChange}
                                />
                                <Label for='name'>תיאור</Label>
                                <Input
                                    type='text'
                                    name='description'
                                    id='description'
                                    placeholder='תיאור המוצר'
                                    className='mb-2'
                                    onChange={this.onChange}
                                />
                                {/* <Label for='description'>תיאור</Label>
                                <Editor
                                    editorState={this.state.editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                    onChange={this.onChangeEditor}
                                    placeholder='תיאור המוצר'
                                    name='description'
                                    id='description'
                                    hashtag={{
                                        separator: ' ',
                                        trigger: '#',
                                      }}
                                /> */}
                                <Label for='price'>מחיר</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name='price'
                                    id='price'
                                    placeholder='מחיר'
                                    className='mb-2'
                                    onChange={this.onChange}
                                />

                                <label class="checkbox_item" style={{display:'block'}}>      
                                    <input class="ml-2" onChange={this.OnCheckedDiscount} type="checkbox" name="breed" data-tax="name" defaultValue={this.state.checkedDiscount} />
                                    <span>הנחה</span>
                                </label>
                                <Collapse isOpen={this.state.checkedDiscount} className="mt-3">
                                    <Input
                                        type="number"
                                        step="0.01"
                                        name='discount'
                                        id='discount'
                                        placeholder='הזן הנחה באחוזים'
                                        value={this.state.discount}
                                        onChange={this.onChange}
                                    />
                                    <small >הזן הנחה באחוזים</small>
                                    <small style={{display:'block'}}>מחיר מבצע: {(this.state.price - this.state.price *(this.state.discount/100)).toFixed(2)} &#8362;</small >
                                </Collapse>

                                <label class="checkbox_item" style={{display:'block', marginTop:'1rem'}}>      
                                    <input class="ml-2" onChange={this.OnCheckedWeight} type="checkbox" name="breed" data-tax="name" defaultValue={this.state.checkedWeight} />
                                    <span>משקל</span>
                                </label>
                                <Collapse isOpen={this.state.checkedWeight} className="mt-3">

                                    <Input
                                        type="number"
                                        step="0.01"
                                        name='weight'
                                        id='weight'
                                        placeholder='הזן משקל בק"ג'
                                        value={this.state.weight}
                                        onChange={this.onChange}
                                    />
                                    <small >הזן משקל בק"ג</small>
                                </Collapse>

                                <ButtonDropdown 
                                    style={{marginBottom: '1rem', marginTop:'1rem'}} 
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
                                        {categories.map(({ name, _id}) => (
                                        <DropdownItem key={_id} name='category' value={_id} onClick={this.selectCategory}>{name}</DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </ButtonDropdown>
                                
                                <ButtonDropdown 
                                    style={{display:'block', marginBottom: '1rem'}} 
                                    isOpen={this.state.dropdownAgeOpen} toggle={this.DropDowntoggleAge}>
                                    <DropdownToggle caret>{this.state.dropDownAgeValue}</DropdownToggle>
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
                                        {ages.map(({ level, _id}) => (
                                        <DropdownItem key={_id} name='age' value={_id} onClick={this.selectAge}>{level}</DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </ButtonDropdown>

                                <ButtonDropdown 
                                    style={{display:'block', marginBottom: '1rem'}}
                                     
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
                                        style={{marginBottom: '1rem'}} 
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
                                    payload={ payload } 
                                    setRegisterModalStates={this.setRegisterModalStates}
                                    path = {this.state.path}
                                    currImage={noImageFullpath}
                                    />


                                <Button
                                    color='dark'
                                    style={{marginTop: '2rem'}}
                                    block
                                >הוסף מוצר</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    msg: state.msg,
    pet:state.pet,
    category: state.category,
    age: state.age
});

export default connect(
    mapStateToProps,
    {addItem, clearErrors, clearMsgs, getPets, getPet, getCategories, getAges}
    )(ItemModal);

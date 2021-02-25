import React, { Component, Fragment } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert,
    ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Fade, Collapse,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { editItem } from '../../actions/itemActions';
import { clearErrors } from '../../actions/errorActions';
import { clearMsgs } from '../../actions/msgActions';
import { getPets, getPet } from '../../actions/petActions';
import { getAges } from '../../actions/ageActions';
import FileUpload from '../fileupload/FileUpload';


class ItemModal extends Component {
    state = {
        path: '/uploads/items/',

        name: '',
        price: 0,
        discount: null,
        weight: null,
        description: '',
        pet: '',
        breed: '',
        category: '',
        age: '',
        itemImage: '',

        modal: false,
        fadeIn: true,
        prevItemImage: '',
        imageSubmited: false,
        // imageUpdated: false,
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
        removedOrginalImageAndNotSave: false,
        editorState: EditorState.createEmpty()
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        msg: PropTypes.object.isRequired,
        pet: PropTypes.object.isRequired,
        editItem: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        clearMsgs: PropTypes.func.isRequired,
        getPet: PropTypes.func.isRequired,
        getPets: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { items } = this.props.item;
        const item = items.filter(item => item._id == this.props.itemID)[0];

        if (item.discount)
            this.setState({
                checkedDiscount: true
            });

        if (item.weight)
            this.setState({
                checkedWeight: true
            });

        this.setState({
            name: item.name,
            description: item.description,
            price: item.price,
            discount: item.discount,
            weight: item.weight,
            category: item.category.name,
            pet: item.pet.name,
            age: item.age.level,
            breed: item.breed.name,
            itemImage: item.itemImage,
            prevItemImage: item.itemImage
        });

        if (this.state.prevItemImage != '')
            this.setState({ prevItemImage: item.itemImage });
    }

    componentDidUpdate(prevProps) {
        const { error, msg, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for edit error
            if (error.id === 'EDIT_ITEM_FAIL') {
                this.setState({ msg: error.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        //If edited, close modal
        if (this.state.modal) {
            if (!this.state.removedOrginalImageAndNotSave && msg && msg.id === 'EDIT_ITEM_SUCCESS') {
                this.toggle();
            }
        }
    }

    // onEditorStateChange = (editorState) => {
    //     this.setState({
    //         editorState,
    //     });
    // };

    toggle = () => {
        const { items } = this.props.item;
        const item = items.filter(item => item._id == this.props.itemID)[0];

        if (item.discount)
            this.setState({
                discount: item.discount,
                checkedDiscount: true
            });
        else {
            this.setState({
                discount: null,
                checkedDiscount: false
            });
        }
        if (item.weight)
            this.setState({
                weight: item.weight,
                checkedWeight: true
            });
        else {
            this.setState({
                weight: null,
                checkedWeight: false
            });
        }

        // Clear errors
        this.props.clearErrors();
        // Clear msgs
        this.props.clearMsgs();

        this.setState({
            modal: !this.state.modal,
        });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
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

        // Edit item via addItem action
        this.props.editItem(this.props.itemID, newItem);

        // const { items } = this.props.item;
        // const item = items.filter(item => item._id == this.props.itemID)[0];

        //delete prev image
        const noImageFullpath = this.state.path + 'no-image.png';
        if (this.state.itemImage != this.state.prevItemImage && this.state.prevItemImage != noImageFullpath) {
            const formData = new FormData();
            formData.append('filepath', this.state.prevItemImage);
            formData.append('abspath', this.state.path);

            axios.post('/remove', formData);
        }
        this.setState({
            imageSubmited: true,
            removedOrginalImageAndNotSave: false
        });

        // Close modal
        // this.toggle();
    }

    removedOrginalImageAndNotSave = () => {
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


        // Attempt to edit
        this.props.editItem(this.props.itemID, newItem);

        //delete prev image
        const noImageFullpath = this.state.path + 'no-image.png';
        if (this.state.itemImage != this.state.prevItemImage && this.state.prevItemImage != noImageFullpath) {
            const formData = new FormData();
            formData.append('filepath', this.state.prevItemImage);
            formData.append('abspath', this.state.path);

            axios.post('/remove', formData);
        }
        this.setState({
            imageSubmited: true,
            removedOrginalImageAndNotSave: true
        });
    }

    OnCheckedDiscount = () => {
        const { items } = this.props.item;
        const item = items.filter(item => item._id == this.props.itemID)[0];

        if (item.discount)
            this.setState({
                discount: item.discount
            });
        else {
            this.setState({
                discount: null
            });
        }

        this.setState({
            checkedDiscount: !this.state.checkedDiscount
            // discount: null
        });
    }
    OnCheckedWeight = () => {
        const { items } = this.props.item;
        const item = items.filter(item => item._id == this.props.itemID)[0];

        if (item.weight)
            this.setState({
                weight: item.weight
            });
        else {
            this.setState({
                weight: null
            });
        }
        this.setState({
            checkedWeight: !this.state.checkedWeight,
            // weight: null
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

    selectCategory = (event) => {
        this.setState({
            dropdownCategoryOpen: !this.state.dropdownCategoryOpen,
            dropDownCategoryValue: event.target.innerText,
            [event.target.name]: event.target.innerText
        });
    }

    selectAge = (event) => {
        this.setState({
            dropdownAgeOpen: !this.state.dropdownAgeOpen,
            dropDownAgeValue: event.target.innerText,
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
            this.setState({
                itemImage: val
                // imageUpdated: true
            });
    }
    close = () => {
        const { items } = this.props.item;
        const item = items.filter(item => item._id == this.props.itemID)[0];

        const filepath = this.state.itemImage
        const noImageFullpath = this.state.path + 'no-image.png';
        if (!this.state.imageSubmited && this.state.itemImage != this.state.prevItemImage && filepath != noImageFullpath) {
            const formData = new FormData();
            formData.append('filepath', filepath);
            formData.append('abspath', this.state.path);
            axios.post('/remove', formData);

            this.setState({
                name: item.name,
                description: item.description,
                price: item.price,
                discount: item.discount,
                weight: item.weight,
                category: item.category.name,
                pet: item.pet.name,
                age: item.age.level,
                breed: item.breed.name,
                itemImage: item.itemImage,
                prevItemImage: item.itemImage
            });

            this.props.getPet(item.pet.name);
        }
        else {
            this.setState({
                imageSubmited: false,
                prevItemImage: item.itemImage
            });
        }
        if(this.state.removedOrginalImageAndNotSave){
            this.removedOrginalImageAndNotSave();
        }
    }

    onEditClick = (id) => {
        this.props.editItem(id);
    }

    removedOrginalItemImage = () => {
        this.setState({
            removedOrginalImageAndNotSave: true
        });    }

    render() {
        const { pets, pet } = this.props.pet;
        const { categories } = this.props.category;
        const { ages } = this.props.age;
        const { items } = this.props.item;

        //payload name for item image
        var payload = this.state.price;
        if (this.state.discount)
            payload = payload + this.state.discount;
        if (this.state.weight)
            payload = payload + this.state.weight;

        var item = items.filter(item => item._id == this.props.itemID)[0];

        return (
            <Fragment>
                { this.props.isAuthenticated ?
                    <Button
                        className='edit-btn'
                        title="ערוך"
                        color='warning'
                        size='sm'
                        onClick={this.toggle}
                    // { this.onEditClick.bind(this, this.props.itemID) }
                    >&#x2711;</Button>
                    : null}


                <Modal
                    align="right"
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    onClosed={this.close}
                >
                    <ModalHeader cssModule={{ 'modal-title': 'w-100 text-center' }} toggle={this.toggle} ><span class="lead">ערוך מוצר</span></ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
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
                                    defaultValue={this.state.name}
                                />
                                <Label for='name'>תיאור</Label>
                                <Input
                                    type='text'
                                    name='description'
                                    id='description'
                                    placeholder='תיאור המוצר'
                                    className='mb-2'
                                    onChange={this.onChange}
                                    defaultValue={this.state.description}
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
                                    defaultValue={this.state.price}
                                />

                                <label class="checkbox_item" style={{ display: 'block' }}>
                                    {
                                        this.state.checkedDiscount ?
                                            <input class="ml-2" onChange={this.OnCheckedDiscount} type="checkbox" name="breed" data-tax="name" defaultValue={this.state.checkedDiscount} checked />
                                            : <input class="ml-2" onChange={this.OnCheckedDiscount} type="checkbox" name="breed" data-tax="name" defaultValue={this.state.checkedDiscount} />
                                    }
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
                                        defaultValue={this.state.discount}
                                        onChange={this.onChange}
                                    />
                                    <small >הזן הנחה באחוזים</small>
                                    <small style={{ display: 'block' }}>מחיר מבצע: {(this.state.price - this.state.price * (this.state.discount / 100)).toFixed(2)} &#8362;</small >
                                </Collapse>

                                <label class="checkbox_item" style={{ display: 'block', marginTop: '1rem' }}>
                                    {
                                        this.state.checkedWeight ?
                                            <input class="ml-2" onChange={this.OnCheckedWeight} type="checkbox" name="breed" data-tax="name" defaultValue={this.state.checkedWeight} checked />
                                            : <input class="ml-2" onChange={this.OnCheckedWeight} type="checkbox" name="breed" data-tax="name" defaultValue={this.state.checkedWeight} />
                                    }
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
                                    style={{ marginBottom: '1rem', marginTop: '1rem' }}
                                    isOpen={this.state.dropdownCategoryOpen} toggle={this.DropDowntoggleCategory}>
                                    <DropdownToggle caret>{this.state.category}</DropdownToggle>
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
                                    isOpen={this.state.dropdownAgeOpen} toggle={this.DropDowntoggleAge}>
                                    <DropdownToggle caret>{this.state.age}</DropdownToggle>
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
                                        {ages.map(({ level, _id }) => (
                                            <DropdownItem key={_id} name='age' value={_id} onClick={this.selectAge}>{level}</DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </ButtonDropdown>

                                <ButtonDropdown
                                    style={{ display: 'block', marginBottom: '1rem' }}

                                    isOpen={this.state.dropdownPetOpen} toggle={this.DropDowntogglePet}>
                                    <DropdownToggle caret>{this.state.pet}</DropdownToggle>
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
                                        {this.state.breed != '' ?
                                            <DropdownToggle caret>{this.state.breed}</DropdownToggle>
                                            :
                                            <DropdownToggle caret>{this.state.dropDownBreedValue}</DropdownToggle>
                                        }

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
                                    currImage={this.state.itemImage}
                                    prevImage={this.state.prevItemImage}
                                    imageSaved={this.state.imageSubmited}
                                    removedOrginalImageAndNotSave={this.removedOrginalImageAndNotSave}
                                    removedOrginalItemImage={this.removedOrginalItemImage}
                                />


                                <Button
                                    color='dark'
                                    style={{ marginTop: '2rem' }}
                                    block
                                >שמור</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    msg: state.msg,
    pet: state.pet,
    category: state.category,
    age: state.age
});

export default connect(
    mapStateToProps,
    { editItem, clearErrors, clearMsgs, getPets, getPet, getAges }
)(ItemModal);

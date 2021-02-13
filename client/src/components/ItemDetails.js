import React, { Component, Fragment } from 'react';
import {
    CardText, Modal, ModalHeader, ModalBody, Card, CardTitle, CardSubtitle,
    ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, CardFooter, CardBody, CardImg, Button
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItem } from '../actions/itemActions';
import { clearErrors } from '../actions/errorActions';
import { getPets, getPet } from '../actions/petActions';
import { getCategories } from '../actions/categoryActions';
import { getAges } from '../actions/ageActions';
import FileUpload from './FileUpload';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import {Collapse} from 'react-collapse';

class ItemDetail extends Component {
    state = {
        path: '/uploads/items/',
        modal: true,
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
        fadeIn: false,
        dropDownCategoryValue: 'בחר קטגוריה',
        dropDownAgeValue: 'בחר שלב חיים',
        dropDownPetValue: 'בחר חיית מחמד',
        dropDownBreedValue: 'בחר גזע',
        dropDownCategoryOpen: false,
        dropDownAgeOpen: false,
        dropDownPetOpen: false,
        dropDownBreedOpen: false,
        dropDownPaymentOpen: false,
        checkedDiscount: false,
        checkedWeight: false,

        editorState: EditorState.createEmpty()
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
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
        //this.props.getItem(this.props.itemID);
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'REGISTER_FAIL') { ///////////////////////////////////////////////////////  
                this.setState({ msg: error.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // If authenticated, close modal
        // if(this.state.modal) {
        //     if(isAuthenticated) {
        //         this.toggle();
        //     }
        // }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    toggle = () => {
        // Clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal,
            checkedDiscount: false,
            checkedWeight: false,
            discount: null,
            weight: null,
            fadeIn: false,
            dropDownCategoryValue: 'בחר קטגוריה',
            category: '',
            dropDownPetValue: 'בחר חיית מחמד',
            breed: '',
            dropDownBreedValue: 'בחר גזע',
            pet: '',
            dropDownAgeValue: 'בחר שלב חיים',
            age: ''
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

        // console.log(convertToRaw(content));

        // Add item via addItem action
        this.props.addItem(newItem);

        this.setState({
            name: '',
            price: 0,
            description: '',
            age: '',
            itemImage: '',
            dropDownCategoryOpen: false,
            dropDownAgeOpen: false,
            dropDownPetOpen: false,
            dropDownBreedOpen: false
        })


        // Close modal
        this.toggle();
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
            this.setState({ itemImage: val });
    }
    close = () => {
        this.props.handleClickItemToFalse()
        // const filepath = this.state.itemImage
        // if(filepath !== ''){
        //     const formData = new FormData();
        //     formData.append('filepath', filepath);
        //     formData.append('abspath', this.state.path);

        //     axios.post('/remove', formData);
        //     this.setState({itemImage : ''});
        // }
    }

    PriceDiscountStyle = (discount) => {
        return {
            background: "#f4f4f4",
            padding: "10px",
            borderBottom: "1px #ccc dotted",
            textDecoration: discount ? "line-through" : "none",
        };
    };
    DropDowntogglePayment = () => {
        console.log("here")
        this.setState({
            dropDownPaymentOpen: !this.state.dropDownPaymentOpen
        });
    }
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
                {/* <Button
                    color='dark'
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                    >Item details</Button>  */}


                <Modal
                    align="right"
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    onClosed={this.close}
                >
                    <ModalHeader cssModule={{ 'modal-title': 'w-100 text-center' }} toggle={this.toggle} ><span class="lead">{item && item.name}</span></ModalHeader>
                    <ModalBody>

                        <Card className="item-details-body">
                            <div class="item-image" align="center">
                                <CardImg bottom className='ProductImg' src={item.itemImage} alt="Card image cap" />
                            </div>
                            <CardBody>

                                <div class="item-description mb-4">
                                    <CardText className={["mb-2 text-muted", "pb-3"]}> {item.description}</CardText>
                                </div>

                                {/* <CardSubtitle tag="h6" className="mb-2 text-muted"><spen style={{color: 'black'}}>חיית מחמד:</spen> {item.pet.name}</CardSubtitle> */}

                                <div class="item-price">
                                    <CardFooter>
                                        <div style={this.PriceDiscountStyle(item.discount)}><CardText>מחיר: {item.price} &#8362;</CardText></div>
                                        {item.discount &&

                                            <CardText className="newPrice">מחיר מבצע: {(item.price - item.price * (item.discount / 100)).toFixed(2)} &#8362;</CardText >
                                        }
                                    </CardFooter>
                                </div>



                                <div class="item-views">
                                    <CardText>
                                        <small className="text-muted">צפיות: {item.views}</small>
                                    </CardText>
                                </div>

                            </CardBody>
                            <Button className="item-cart" color="none" title="בצע תשלום" onClick={this.DropDowntogglePayment} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
                                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                                </svg>
                            </Button>
                            <Collapse isOpened={this.state.dropDownPaymentOpen}>
                            <small class='pr-3'>  התשלום מתבצע דרך bit לדרכי ביצוע תשלום  <a style={{color:'orange'}}class='contact-btn' href='/products/payment'>
                                          לחץ כאן
                                            <br />
                                            <br />
                                        </a></small>
                                        
                            </Collapse>
                        </Card>
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
    pet: state.pet,
    category: state.category,
    age: state.age
});

export default connect(
    mapStateToProps,
    { getItem, clearErrors, getPets, getPet, getCategories, getAges }
)(ItemDetail);

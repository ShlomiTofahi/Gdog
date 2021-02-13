import React, { Component, Fragment } from 'react';
import {
    ListGroup, ListGroupItem, Card, Button, CardTitle, CardText, CardBody, CardImg, Row, Col, Form, Fade, Input, Collapse,
    ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu, CardFooter, Container
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem, getFilterItems } from '../actions/itemActions';
import { getAges } from '../actions/ageActions';
import PropTypes from 'prop-types';
import ItemModal from './itemModal';
import Item from './Item';
import SideBarFilterItem from './SideBarFilterItem';
import { getPets, getPet } from '../actions/petActions';
import { getCategories } from '../actions/categoryActions';
import ReactStars from "react-rating-stars-component";

class ShoppingList extends Component {
    // state = {
    //     name: "",
    //     pet: [],
    //     breed: [],
    //     category: [],
    //     picture: [],
    //     age: [],
    //     breeds: [],
    //     //dropDownPetValue: 'Select pet',
    //     //dropDownBreedValue: 'Select breed',
    //     //dropDownPetOpen: false,
    //     //dropDownBreedOpen: false,
    //     // dropDownCategoryOpen: false,
    //     // dropDownDogOpen: false,
    //     // dropDowncatOpen: false,
    //     // dropDownParrotOpen: false,
    //     // dropDownOtherOpen: false
    //    // fadeIn:false
    //    // isOpen:false
    // };

    static protoType = {
        getItems: PropTypes.func.isRequired,
        getFilterItems: PropTypes.func.isRequired,
        getAges: PropTypes.func.isRequired,
        getPet: PropTypes.func.isRequired,
        getPets: PropTypes.func.isRequired,
        getCategrys: PropTypes.func.isRequired,
        auth: PropTypes.object,
        item: PropTypes.object.isRequired,
        age: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        pet: PropTypes.object.isRequired,
        category: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getItems();
        this.props.getAges();
        this.props.getPets();
        this.props.getCategories();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }

    PriceDiscountStyle = (discount) => {
        return {
            background: "#f4f4f4",
            padding: "10px",
            borderBottom: "1px #ccc dotted",
            textDecoration: discount ? "line-through" : "none",
        };
    };
    // onChange = e => {

    //     if(e.target.name == "name"){
    //         this.setState({ name :e.target.value  });

    //     }else{
    //         if(this.state[e.target.name].includes(e.target.defaultValue)){
    //             this.setState( prevState => ({
    //                 [e.target.name]: prevState[e.target.name].filter(element => element !== e.target.defaultValue)
    //                 })); 
    //         }else {
    //             this.setState( prevState => ({
    //                 [e.target.name]: [...prevState[e.target.name], e.target.defaultValue ]
    //                 })); 
    //         }
    //     }

    // }



    // toggle = () => {
    //     this.setState({
    //         isOpen: !this.state.isOpen
    //     });
    // }
    // onSubmit = e => {
    //     e.preventDefault();

    //     const { name, pet, breed, category,age } = this.state;

    //     // Create Filted Item object
    //     const FiltedItems = {
    //         name,
    //         pet,
    //         breed,
    //         category,
    //         age
    //     };

    //     // Attempt to filter
    //     this.props.getFilterItems(FiltedItems);
    // }

    // DropDowntoggleBreed = (name) => {
    //     const { pets } = this.props.pet;

    //     var id ='';
    //     if(pets)
    //         pets.map(pet =>{
    //             if(pet.name == name){
    //                 id = pet._id
    //             }
    //         })

    //     this.props.getPet(id);
    //     if(name=="Dog")
    //     this.setState({
    //         dropdownDogOpen: !this.state.dropdownDogOpen
    //     });
    //     if(name=="Cat")
    //     this.setState({
    //         dropdownCatOpen: !this.state.dropdownCatOpen
    //     });
    //     if(name=="Parrot")
    //     this.setState({
    //         dropdownParrotOpen: !this.state.dropdownParrotOpen
    //     });
    //     if(name=="Other")
    //     this.setState({
    //         dropdownOtherOpen: !this.state.dropdownOtherOpen
    //     });
    // }

    // DropDowntoggleCategory = (name) => {
    //     this.setState({
    //         dropdownCategoryOpen: !this.state.dropdownCategoryOpen
    //     });

    // }


    // DropDowntogglePet = (name) => {
    //     const { pets } = this.props.pet;

    //     var id ='';
    //     if(pets)
    //         pets.map(pet =>{
    //             if(pet.name == name){
    //                 id = pet._id
    //             }
    //         })
    //     console.log(id)
    //     this.props.getPet(id);
    //     this.setState({
    //         dropdownPetOpen: !this.state.dropdownPetOpen
    //     });
    // }
    // DropDowntoggleBreed = (_id) => {

    //     console.log(_id)
    //     this.props.getPet(_id);

    //     this.setState({
    //         dropdownBreedOpen: !this.state.dropdownBreedOpen
    //     });
    // }
    // selectPet =(event) => {
    //     this.onChange(event);
    //     //console.log(event.target.value)

    //     this.props.getPet(event.target.value);

    //     if(this.state.fadeIn==false){
    //         this.setState({fadeIn:!this.state.fadeIn });
    //     }
    //     // this.setState({
    //     //     breed:'',
    //     // });
    //   }

    //   selectBreed =(event) => {
    //     this.onChange(event);


    //     //this.props.getPet(event.target.value);


    //     // this.setState({
    //     //   dropdownBreedOpen: !this.state.dropdownBreedOpen,
    //     //   dropDownBreedValue: event.target.innerText,
    //     //  [event.target.name]: event.target.innerText
    //     // });
    //   }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        var { items } = this.props.item;
        const is_admin = (isAuthenticated && user.admin);

        return (

            <Fragment>
                <Container className='mb-5'>
                    <SideBarFilterItem />

                    <div class="main">

                        {is_admin &&
                            <ItemModal />
                        }
                        <Row>
                            {items.map(({ _id, name, price, age, category, discount, itemImage, pet, breed, description, weight, rating, views }) => (
                                <Item key={_id}
                                    _id={_id}
                                    name={name}
                                    price={price}
                                    age={age}
                                    category={category}
                                    discount={discount}
                                    itemImage={itemImage}
                                    pet={pet}
                                    breed={breed}
                                    description={description}
                                    weight={weight}
                                    rating={rating}
                                    views={views} />
                            ))}
                        </Row>


                        {/* <ListGroup>
                        <TransitionGroup className='shopping-list'>
                            {items.map(({ _id, name,price }) => (
                                    <CSSTransition key={_id} timeout={500} classNames='fade'>
                                    <ListGroupItem>
                                        
                                        { is_admin && 
                                        <Button
                                            className='remove-btn'
                                            color='danger'
                                            size='sm'
                                            onClick={ this.onDeleteClick.bind(this, _id) }
                                            >&times;</Button>
                                            }
                                        {name}
                                        {price}
                                    </ListGroupItem>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </ListGroup> */}
                    </div>
                </Container>

            </Fragment>
        );
    }
}



const mapStateToProps = (state) => ({
    auth: state.auth,
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    age: state.age,
    pet: state.pet,
    category: state.category
});

export default connect(
    mapStateToProps,
    { getItems, deleteItem, getAges, getFilterItems, getPets, getPet, getCategories }
)(ShoppingList);
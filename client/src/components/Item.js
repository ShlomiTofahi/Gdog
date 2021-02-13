import React, { Component, Fragment } from 'react';
import {
    ListGroup, ListGroupItem, Card, Button, CardTitle, CardText, CardBody, CardImg, Row, Col, Form, Fade, Input, Collapse,
    ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu, CardFooter
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { editItem, getItems, deleteItem, getFilterItems, ratingItem, viewsItem } from '../actions/itemActions';
import { getAges } from '../actions/ageActions';
import PropTypes from 'prop-types';
import ItemDetails from './ItemDetails';
import EditItemModal from './EditItemModal';
import SideBarFilterItem from './SideBarFilterItem';
import { getPets, getPet } from '../actions/petActions';
import { getCategories } from '../actions/categoryActions';
import ReactStars from "react-rating-stars-component";

class Item extends Component {
    state = {
        rating: 0,
        itemClicked: false


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
    };

    static protoType = {
        getItems: PropTypes.func.isRequired,
        getFilterItems: PropTypes.func.isRequired,
        getAges: PropTypes.func.isRequired,
        getPet: PropTypes.func.isRequired,
        getPets: PropTypes.func.isRequired,
        getCategrys: PropTypes.func.isRequired,
        ratingItem: PropTypes.func.isRequired,
        viewsItem: PropTypes.func.isRequired,
        auth: PropTypes.object,
        item: PropTypes.object.isRequired,
        age: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        pet: PropTypes.object.isRequired,
        category: PropTypes.object.isRequired
    }

    componentDidMount() {
        //this.props.getItems();
        // this.props.getAges();
        // this.props.getPets();
        // this.props.getCategories();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }


    ratingChanged = (_id, rating) => {
        //console.log(rating)
        //console.log(_id)

        var ratedList = localStorage.getItem('ratedList');
        if (ratedList == null)
            ratedList = [];

        if (!ratedList.includes(String(_id)))
            this.props.ratingItem(_id, rating)

        ratedList = ratedList.concat(String(_id))

        localStorage.setItem('ratedList', ratedList);

    };

    PriceDiscountStyle = (discount) => {
        return {
            background: "#f4f4f4",
            padding: "10px",
            borderBottom: "1px #ccc dotted",
            textDecoration: discount ? "line-through" : "none",
        };
    };

    handleClickItemToTrue = (id) => {
        var viewedList = localStorage.getItem('viewedList');
        if (viewedList == null)
            viewedList = [];

        if (!viewedList.includes(String(id)))
            this.props.viewsItem(id)

        viewedList = viewedList.concat(String(id))

        localStorage.setItem('viewedList', viewedList);

        this.setState({
            itemClicked: true
        });

    }

    handleClickItemToFalse = () => {
        this.setState({
            itemClicked: false
        });
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const { items } = this.props.item;
        const { ages } = this.props.age;
        const is_admin = (isAuthenticated && user.admin);
        const { pets } = this.props.pet;
        const { categorys } = this.props.category;

        var dogBreeds = null;
        var catBreeds = null;
        var parrotBreeds = null;
        var otherBreeds = null;

        if (pets)
            pets.map(pet => {
                if (pet.name == "Dog") {
                    dogBreeds = pet.breeds
                }
                if (pet.name == "Cat") {
                    catBreeds = pet.breeds
                }
                if (pet.name == "Parrot") {
                    parrotBreeds = pet.breeds
                }
                if (pet.name == "Other") {
                    otherBreeds = pet.breeds
                }
            })
        const { _id, name, price, age, category, discount, itemImage, pet, breed, description, weight, rating, views } = this.props;
        rating.overall = (rating.overall % 1) > 0.85 ? rating.overall + 1 : rating.overall;
        return (

            <Fragment>


                <CSSTransition key={_id} timeout={500} classNames='fade'>

                    <Col xs="12" sm="6" md="4" className='pt-4' >
                        <div className='position-relative'>
                            <Card className={['products']} align="right" timeout={500}
                                style={{
                                    maxHeight: "500px", minHeight: "400px",
                                    // backgroundImage: 'url(images/itemcard.png)',
                                    // objectFit: 'cover',
                                }}

                            >
                                <CardBody >
                                    {is_admin &&
                                        <div>
                                            <Button
                                                className='remove-btn'
                                                title="מחק"
                                                color='danger'
                                                size='sm'
                                                onClick={this.onDeleteClick.bind(this, _id)}
                                            >&#10007;</Button>
                                            <EditItemModal itemID={_id} />

                                        </div>

                                    }
                                    <div class="items-image" align="center" onClick={this.handleClickItemToTrue.bind(this, _id)}>
                                        <CardImg bottom className='ProductImg' src={itemImage} alt="תמונה חיית מחמד" />
                                    </div>

                                    <div class="rating">
                                        <ReactStars
                                            count={5}
                                            onChange={this.ratingChanged.bind(this, _id)}
                                            size={24}
                                            activeColor="#ffd700"
                                            value={rating.overall}
                                        />
                                    </div>
                                    <div onClick={this.handleClickItemToTrue.bind(this, _id)}>
                                        <CardTitle className={['items-name', 'text-center', 'pt-2']} tag="h5">{name}</CardTitle>


                                        {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                                        {/* { pet && breed && category &&
                        <div>
                            <CardText>קטגוריה: {category.name} </CardText>
                            <CardText>חיית מחמד: {pet.name} </CardText>
                            <CardText>גזע: {breed.name} </CardText>
                        </div>
                        }
                        <CardText>גודל: {age.level} </CardText>*/}
                                        {/* <CardText>{description} </CardText>  */}
                                        {weight &&
                                            <CardText>משקל: {weight} ק"ל </CardText>
                                        }


                                    </div>
                                </CardBody>
                                <div class="items-views">
                                    <CardText className='pr-2'>
                                        <small className='text-muted'>צפיות: {views}</small>
                                    </CardText>
                                </div>
                                {this.state.itemClicked ? <ItemDetails itemID={_id} handleClickItemToFalse={this.handleClickItemToFalse} /> : null}

                                <CardFooter onClick={this.handleClickItemToTrue.bind(this, _id)}>
                                    <div style={this.PriceDiscountStyle(discount)}><CardText>מחיר: {price} &#8362;</CardText></div>
                                    {discount &&

                                        <CardText className="newPrice">מחיר מבצע: {(price - price * (discount / 100)).toFixed(2)} &#8362;</CardText >
                                    }
                                </CardFooter>
                            </Card>
                        </div>

                    </Col>
                </CSSTransition>


                {/* 
                    <ListGroup>
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
    { getItems, deleteItem, viewsItem, getAges, getFilterItems, getPets, getPet, getCategories, ratingItem }
)(Item);
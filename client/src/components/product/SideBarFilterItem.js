import React, { Component, Fragment } from 'react';
import {
    Button, Col, Form, Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';

import { getItems, getFilterItems, getMinMaxPrice } from '../../actions/itemActions';
import { getAges } from '../../actions/ageActions';
import { getPets, getPet } from '../../actions/petActions';
import { getCategories } from '../../actions/categoryActions';

class ShoppingList extends Component {
    state = {
        Collapsetoggle: false,
        name: "",
        price: "",
        rating: "",
        pet: [],
        breed: [],
        category: [],
        age: [],
        breeds: [],

        dropDownCategoryOpen: false,
        dropDownRatingOpen: false,
        dropDownDogOpen: false,
        dropDowncatOpen: false,
        dropDownParrotOpen: false,
        dropDownOtherOpen: false
    };

    static protoType = {
        getItems: PropTypes.func.isRequired,
        getFilterItems: PropTypes.func.isRequired,
        getAges: PropTypes.func.isRequired,
        getPet: PropTypes.func.isRequired,
        getPets: PropTypes.func.isRequired,
        getCategories: PropTypes.func.isRequired,
        getMinMaxPrice: PropTypes.func.isRequired,
        auth: PropTypes.object,
        item: PropTypes.object.isRequired,
        age: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        pet: PropTypes.object.isRequired,
        category: PropTypes.object.isRequired
    }

    componentDidMount() {
        // this.props.getItems();
        // this.props.getAges();
        // this.props.getPets();
        // this.props.getCategories();
        this.props.getMinMaxPrice();
        // if(this.props.item.minmaxprice)
        //     this.setState({price:this.props.item.minmaxprice.max})
    }

    onChange = e => {
        if (e.target.name == "name") {
            this.setState({ name: e.target.value });
        }
        else if (e.target.name == "rating") {
            const rate = Number(e.target.value);
            if (rate == -1)
                this.setState({ rating: "" });
            else
                this.setState({ rating: rate });
        }
        else if (e.target.name == "price") {
            const price = Number(e.target.value);
            this.setState({ price });
        }
        else {
            if (this.state[e.target.name].includes(e.target.defaultValue)) {
                this.setState(prevState => ({
                    [e.target.name]: prevState[e.target.name].filter(element => element !== e.target.defaultValue)
                }));
            } else {
                this.setState(prevState => ({
                    [e.target.name]: [...prevState[e.target.name], e.target.defaultValue]
                }));
            }
        }

    }

    onSubmit = e => {
        e.preventDefault();

        const { name, price, pet, breed, category, age, rating } = this.state;

        // Create Filted Item object
        const FiltedItems = {
            name,
            price,
            pet,
            breed,
            category,
            age,
            rating
        };

        // Attempt to filter
        this.props.getFilterItems(FiltedItems);
    }

    DropDowntoggleBreed = (name) => {
        const { pets } = this.props.pet;

        var id = '';
        if (pets)
            pets.map(pet => {
                if (pet.name == name) {
                    id = pet._id
                }
            })

        this.props.getPet(id);
        if (name == "כלב")
            this.setState({
                dropdownDogOpen: !this.state.dropdownDogOpen
            });
        if (name == "חתול")
            this.setState({
                dropdownCatOpen: !this.state.dropdownCatOpen
            });
        if (name == "תוכי")
            this.setState({
                dropdownParrotOpen: !this.state.dropdownParrotOpen
            });
        if (name == "אחר")
            this.setState({
                dropdownOtherOpen: !this.state.dropdownOtherOpen
            });
    }

    DropDowntoggleCategory = () => {
        this.setState({
            dropDownCategoryOpen: !this.state.dropDownCategoryOpen
        });
    }

    DropDowntoggleRating = () => {
        this.setState({
            dropDownRatingOpen: !this.state.dropDownRatingOpen
        });
    }

    PriceDiscountStyle = (discount) => {
        return {
            background: "#f4f4f4",
            padding: "10px",
            borderBottom: "1px #ccc dotted",
            textDecoration: discount ? "line-through" : "none",
        };
    };
    CollapseHangdle = () => {
        this.setState({
            Collapsetoggle: !this.state.Collapsetoggle
        })
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        const { items, minmaxprice } = this.props.item;
        const { ages } = this.props.age;
        const is_admin = (isAuthenticated && user.admin);
        const { pets, pet } = this.props.pet;
        const { categories } = this.props.category;


        var dogBreeds = null;
        var catBreeds = null;
        var parrotBreeds = null;
        var otherBreeds = null;

        if (pets)
            pets.map(pet => {
                if (pet.name == "כלב") {
                    dogBreeds = pet.breeds
                }
                if (pet.name == "חתול") {
                    catBreeds = pet.breeds
                }
                if (pet.name == "תוכי") {
                    parrotBreeds = pet.breeds
                }
                if (pet.name == "אחר") {
                    otherBreeds = pet.breeds
                }
            })
        const ratingStars = ([-1, 0, 1, 2, 3, 4, 5]);

        const filterBtnSymbol = this.state.Collapsetoggle ?
            <span class="up-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg></span> :
            <span class="down-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
            </svg></span>
            
        var filterDropDownSymbol = {}
        filterDropDownSymbol['category'] = this.state.dropDownCategoryOpen ? <span>&#45;</span> : <span>&#x2B;</span>
        filterDropDownSymbol['rating'] = this.state.dropDownRatingOpen ? <span>&#45;</span> : <span>&#x2B;</span>
        filterDropDownSymbol['dog'] = this.state.dropdownDogOpen ? <span>&#45;</span> : <span>&#x2B;</span>
        filterDropDownSymbol['cat'] = this.state.dropdownCatOpen ? <span>&#45;</span> : <span>&#x2B;</span>
        filterDropDownSymbol['parrot'] = this.state.dropdownParrotOpen ? <span>&#45;</span> : <span>&#x2B;</span>
        filterDropDownSymbol['other'] = this.state.dropdownOtherOpen ? <span>&#45;</span> : <span>&#x2B;</span>

        return (
            <Fragment>



                <div class="sidenav" align="center">
                    <button style={{ fontSize: '1.0em' }} class="lead collapse-filter-btn" onClick={this.CollapseHangdle}>  <span class="pl-1">סינון מוצרים</span>
                    
                        {filterBtnSymbol}
                    </button>
                    {/* <Button onClick={this.CollapseHangdle}>סינון מוצרים</Button> */}
                    <Collapse isOpened={this.state.Collapsetoggle}>

                        <hr style={{ width: "80%" }} />
                        <Form onSubmit={this.onSubmit} >

                            <Button outline
                                size="sm"
                                className="filter-btn"
                                color='secondary'
                                style={{ marginTop: '2rem' }}
                                block
                            >סנן</Button>
                            <nav class="navbar navbar-light bg-light mt-3  pr-2">
                                <div class="input-group">
                                    <Input size="sm" onChange={this.onChange} type="text" name='name' class="form-control " placeholder="חפש מוצר" />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-search myearch" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </div>
                            </nav>


                            {
                                minmaxprice &&
                                <div class="slidecontainer">
                                    <input onChange={this.onChange} name='price' type="range" min={minmaxprice.min} max={minmaxprice.max} class="slider" id="myRange" />
                                    <small>מחיר: {this.state.price} &#8362;</small>
                                </div>
                            }
                            <hr style={{ width: "80%" }} />


                            {ages.map(({ _id, level }) => (
                                <Col key={_id} align="right" className='pt-0'>
                                    <label class="checkbox_item">
                                        <input class="ml-2" onChange={this.onChange} type="checkbox" name="age" data-tax="level" defaultValue={level} />
                                        <small>{level}</small>
                                    </label>
                                </Col>
                            ))}
                            <hr style={{ width: "80%" }} />

                            <div>
                                <Button className="collapsible" onClick={this.DropDowntoggleRating} style={{ marginBottom: '1rem' }}>דירוג <strong style={{ marginRight: '68px' }}>{filterDropDownSymbol['rating']}</strong></Button>
                                <Collapse isOpened={this.state.dropDownRatingOpen}>

                                    {ratingStars &&
                                        ratingStars.map((star) => (
                                            <Col align="right" className='pt-2'>

                                                <label class="ratingFilter">
                                                    <input onChange={this.onChange} class="ml-2" type="radio" name="rating" defaultValue={star} />
                                                    <span class="checkmark">
                                                        {(function (rows, i, len) {
                                                            if (len == -1)
                                                                rows.push(<small>נקה דירוג</small>)
                                                            if (len == 0)
                                                                rows.push(<small>ללא דירוג</small>)
                                                            else
                                                                while (++i <= len) {
                                                                    rows.push(<span style={{ color: '#ffd700' }}>&#9733; </span>)
                                                                }
                                                            return rows;
                                                        })([], 0, star)}
                                                    </span>
                                                </label>
                                            </Col>

                                        ))
                                    }

                                </Collapse>
                            </div>

                            <div>
                                <Button className="collapsible" onClick={this.DropDowntoggleCategory} style={{ marginBottom: '1rem' }}>קטגוריה <strong style={{ marginRight: '44px' }}>{filterDropDownSymbol['category']}</strong></Button>
                                <Collapse isOpened={this.state.dropDownCategoryOpen}>
                                    {categories &&
                                        categories.map(({ _id, name }) => (
                                            <Col key={_id} align="right" className='pt-0'>
                                                <label class="checkbox_item">
                                                    <input class="ml-2" onChange={this.onChange} type="checkbox" name="category" data-tax="name" defaultValue={name} />
                                                    <small>{name}</small>
                                                </label>

                                            </Col>
                                        ))}
                                </Collapse>
                            </div>

                            <div>
                                <Button className="collapsible" onClick={this.DropDowntoggleBreed.bind(this, "כלב")} style={{ marginBottom: '1rem' }}>כלב <strong style={{ marginRight: '73px' }}>{filterDropDownSymbol['dog']}</strong></Button>
                                <Collapse isOpened={this.state.dropdownDogOpen}>
                                    {dogBreeds &&
                                        dogBreeds.map(({ _id, name }) => (
                                            <Col key={_id} align="right" className='pt-0'>
                                                <label class="checkbox_item">
                                                    <input class="ml-2" onChange={this.onChange} type="checkbox" name="breed" data-tax="name" defaultValue={name} />
                                                    <small>{name}</small>
                                                </label>

                                            </Col>
                                        ))}
                                </Collapse>
                            </div>

                            <div>
                                <Button className="collapsible" onClick={this.DropDowntoggleBreed.bind(this, "חתול")} style={{ marginBottom: '1rem' }}>חתול <strong style={{ marginRight: '65px' }}>{filterDropDownSymbol['cat']}</strong></Button>
                                <Collapse isOpened={this.state.dropdownCatOpen}>
                                    {catBreeds &&
                                        catBreeds.map(({ _id, name }) => (
                                            <Col key={_id} align="right" className='pt-0'>
                                                <label class="checkbox_item">
                                                    <input class="ml-2" onChange={this.onChange} type="checkbox" name="breed" data-tax="name" defaultValue={name} />
                                                    <small>{name}</small>
                                                </label>

                                            </Col>
                                        ))}
                                </Collapse>
                            </div>

                            <div>
                                <Button className="collapsible" onClick={this.DropDowntoggleBreed.bind(this, "תוכי")} style={{ marginBottom: '1rem' }}>תוכי <strong style={{ marginRight: '71px' }}>{filterDropDownSymbol['parrot']}</strong></Button>
                                <Collapse isOpened={this.state.dropdownParrotOpen}>
                                    {parrotBreeds &&
                                        parrotBreeds.map(({ _id, name }) => (
                                            <Col key={_id} align="right" className='pt-0'>
                                                <label class="checkbox_item">
                                                    <input class="ml-2" onChange={this.onChange} type="checkbox" name="breed" data-tax="name" defaultValue={name} />
                                                    <small>{name}</small>
                                                </label>

                                            </Col>
                                        ))}
                                </Collapse>
                            </div>

                            <div>
                                <Button className="collapsible" onClick={this.DropDowntoggleBreed.bind(this, "אחר")} style={{ marginBottom: '1rem' }}>אחר <strong style={{ marginRight: '69px' }}>{filterDropDownSymbol['other']}</strong></Button>
                                <Collapse isOpened={this.state.dropdownOtherOpen}>
                                    {otherBreeds &&
                                        otherBreeds.map(({ _id, name }) => (
                                            <Col key={_id} align="right" className='pt-0'>
                                                <label class="checkbox_item">
                                                    <input class="ml-2" onChange={this.onChange} type="checkbox" name="breed" data-tax="name" defaultValue={name} />
                                                    <small>{name}</small>
                                                </label>

                                            </Col>
                                        ))}
                                </Collapse>
                            </div>

                        </Form>
                    </Collapse>

                </div>

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
    { getItems, getAges, getFilterItems, getPets, getPet, getCategories, getMinMaxPrice }
)(ShoppingList);
import React, { Component, Fragment } from 'react';
import {
    Button, Col
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import { Link } from 'react-router-dom';

import { getItems, getFilterItems, getMinMaxPrice } from '../../actions/itemActions';
import { getAges } from '../../actions/ageActions';
import { getPets } from '../../actions/petActions';
import { getCategories } from '../../actions/categoryActions';

class Robot extends Component {
    state = {
        Collapsetoggle: false,
        needHelpOpen: true,
        needHelp: '',

        resultOpen: false,
        result: '',

        todoOpen: false,
        todo: '',

        petOpen: false,
        pet: '',

        categoryOpen: false,
        category: '',
        // name: "",
        // price: "",
        // rating: "",
        // pet: [],
        // breed: [],
        // category: [],
        // age: [],
        // breeds: [],
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
        // if(this.props.item.minmaxprice)
        //     this.setState({price:this.props.item.minmaxprice.max})
    }



    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmitNeedHelp = e => {
        e.preventDefault();

        this.setState({ needHelpOpen: false });
        if (this.state.needHelp === 'yes') {
            this.setState({
                todoOpen: !this.state.todoOpen
            })
        }
        else {
            this.setState({
                Collapsetoggle: false
            })
        }
    }

    onSubmitTodo = e => {
        e.preventDefault();

        this.setState({ todoOpen: false });
        if (this.state.todo === 'buy') {
            this.setState({
                petOpen: true
            })
        }
        else if (this.state.todo === 'haircut') {
            this.setState({
                petOpen: true
            })
        }
        else if (this.state.todo === 'forum') {
            this.setState({
                petOpen: true
            })
        }
    }

    onSubmitPet = e => {
        e.preventDefault();
        this.setState({ petOpen: false });
        if (this.state.pet === 'כלב') {
            if (this.state.todo === 'haircut') {
                this.setState({
                    resultOpen: true
                })
            } else
                this.setState({
                    categoryOpen: true
                })
        }
        else if (this.state.pet === 'חתול') {
            if (this.state.todo === 'haircut') {
                this.setState({
                    resultOpen: true
                })
            } else
                this.setState({
                    categoryOpen: true
                })
        }
        else if (this.state.pet === 'תוכי') {
            this.setState({
                categoryOpen: true
            })
        }
        else if (this.state.pet === 'אחר') {
            this.setState({
                categoryOpen: true
            })
        }
    }
    onSubmitCategory = e => {
        e.preventDefault();
        this.setState({ categoryOpen: false });
        if (this.state.todo === 'buy') {
            //TODO
        }
        else if (this.state.pet === 'forum') {
            //TODO
        }
        this.setState({
            resultOpen: true
        })
    }

    // petOpenHangdle = () => {
    //     this.setState({
    //         petOpen: !this.state.petOpen
    //     })
    // }

    CollapseHangdle = () => {
        this.setState({
            Collapsetoggle: !this.state.Collapsetoggle
        })
    }
    reset = () => {
        this.setState({
            Collapsetoggle: true,
            needHelpOpen: true,
            resultOpen: false,
            todoOpen: false,
            petOpen: false,
            categoryOpen: false,
        })
    }

    robotstyle = (discount) => {
        return {
            background: this.state.Collapsetoggle ? 'rgba(173, 173, 173, 0.05)' : 'none',
            border: this.state.Collapsetoggle ? '1px solid rgba(0, 0, 0, 0.125)' : 'none',
            borderRadius: this.state.Collapsetoggle ? '.25rem' : 'none',
            width: this.state.Collapsetoggle ? '300px' : 'none'
        };
    };

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

        const filterBtnSymbol = this.state.Collapsetoggle ?
            null :

            <span class="robot-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg><span class="pr-2">צריך עזרה?</span></span>

        var filterDropDownSymbol = {}
        filterDropDownSymbol['category'] = this.state.dropDownCategoryOpen ? <span>&#45;</span> : <span>&#x2B;</span>
        filterDropDownSymbol['rating'] = this.state.dropDownRatingOpen ? <span>&#45;</span> : <span>&#x2B;</span>
        filterDropDownSymbol['dog'] = this.state.dropdownDogOpen ? <span>&#45;</span> : <span>&#x2B;</span>
        filterDropDownSymbol['cat'] = this.state.dropdownCatOpen ? <span>&#45;</span> : <span>&#x2B;</span>
        filterDropDownSymbol['parrot'] = this.state.dropdownParrotOpen ? <span>&#45;</span> : <span>&#x2B;</span>
        filterDropDownSymbol['other'] = this.state.dropdownOtherOpen ? <span>&#45;</span> : <span>&#x2B;</span>

        return (
            // <div align="right">
            //     <Button className="robot-btn" color="none" title="בצע תשלום" onClick={this.CollapseHangdle} >

            //         <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-chat-dots-fill robot-icon" viewBox="0 0 16 16">
            //             <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            //         </svg>
            //         <span class='robot lead'>צריך עזרה?</span>
            //     </Button>
            //     <Collapse class='robot-body' isOpened={this.state.Collapsetoggle}>
            //         <div>
            //             here
            //         </div>
            //     </Collapse>
            // </div>


            <Fragment>



                <div class="robot collapse-filter-btn" style={this.robotstyle()} align="right">
                    <Collapse isOpened={this.state.Collapsetoggle}>
                        <button style={{ fontSize: '1.0em', left: '0' }} class="lead collapse-filter-btn" onClick={this.CollapseHangdle}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                            </svg>
                        </button>
                        <span style={{ fontSize: '1.0em' }} class=' lead pr-5'>איך נוכל לעזור לך?</span>
                        <hr style={{ width: "80%" }} />


                        <Collapse isOpened={this.state.resultOpen}>
                            <span style={{ fontSize: '1.0em' }} class=' lead pr-5'>שמחנו לעזור</span>
                            <Col align="right" className='pt-0'>
                                <label class="checkbox_item">
                                    <small>
                                        {
                                            this.state.todo === "haircut" ? <Link to="/haircut" class="text-dark">תספורת</Link>
                                                : this.state.todo === "buy" ? < Link to="/products" class="text-dark">חנות</Link>
                                                    : this.state.todo === "forum" ? < Link to="/forum" class="text-dark">פורום</Link>
                                                        : <small>מצטער לא לעזור</small>
                                        }

                                    </small>
                                </label>
                            </Col>
                        </Collapse>

                        <Collapse isOpened={this.state.needHelpOpen}>
                            <span style={{ fontSize: '1.0em' }} class='lead pr-4'>היי, צריך עזרה?</span>
                            <Col align="right" className='pt-2'>
                                <label class="checkbox_item pr-3">
                                    <input onChange={this.onChange} class="ml-2" type="radio" name="needHelp" defaultValue='yes' />
                                    <small>כן</small><br />
                                    <input onChange={this.onChange} class="ml-2" type="radio" name="needHelp" defaultValue='no' />
                                    <small>לא</small>
                                </label>
                            </Col>
                            <Button outline
                                size="sm"
                                className="filter-btn"
                                color='secondary'
                                style={{ marginTop: '1rem' }}
                                block
                                onClick={this.onSubmitNeedHelp}
                            >בחר</Button>
                            {/* </Form> */}
                        </Collapse>

                        <Collapse isOpened={this.state.todoOpen}>
                            <span style={{ fontSize: '1.0em' }} class='lead pr-4'
                            >קיימים מגוון אפשרויות שאנחנו מציעים,<br />
                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;מה תרצה לעשות?</span>
                            <div class="pr-3 pt-2">
                                <Col align="right" className='pt-0'>
                                    <label class="checkbox_item">
                                        <input onChange={this.onChange} class="ml-2" type="radio" name="todo" defaultValue="buy" />
                                        <small>לקנות ממבחר המוצרים שלנו</small>
                                    </label>
                                </Col>
                                <Col align="right" className='pt-0'>
                                    <label class="checkbox_item">
                                        <input onChange={this.onChange} class="ml-2" type="radio" name="todo" defaultValue="haircut" />
                                        <small>תספורות עבור כלב/חתול</small>
                                    </label>
                                </Col>
                                <Col align="right" className='pt-0'>
                                    <label class="checkbox_item">
                                        <input onChange={this.onChange} class="ml-2" type="radio" name="todo" defaultValue="forum" />
                                        <small>התייעצות בפורום הקהילתי שלנו</small>
                                    </label>
                                </Col>
                            </div>
                            <Button outline
                                size="sm"
                                className="filter-btn"
                                color='secondary'
                                style={{ marginTop: '1rem' }}
                                block
                                onClick={this.onSubmitTodo}
                            >בחר</Button>
                        </Collapse>

                        <Collapse isOpened={this.state.petOpen}>
                            <span style={{ fontSize: '1.0em' }} class=' lead pr-4'>איזה חיית מלמד יש לך?</span>
                            <div class='pt-2'>
                                {pets.map(({ _id, name }) => (
                                    this.state.todo === "haircut" ?
                                        name === 'כלב' || name === 'חתול' ?

                                            <Col key={_id} align="right" className='pt-0'>
                                                <label class="checkbox_item">
                                                    <input onChange={this.onChange} class="ml-2" type="radio" name="pet" defaultValue={name} />
                                                    <small>{name}</small>
                                                </label>
                                            </Col>
                                            : null
                                        :
                                        <Col key={_id} align="right" className='pt-0'>
                                            <label class="checkbox_item">
                                                <input onChange={this.onChange} class="ml-2" type="radio" name="pet" defaultValue={name} />
                                                <small>{name}</small>
                                            </label>
                                        </Col>
                                ))}
                            </div>
                            <Button outline
                                size="sm"
                                className="filter-btn"
                                color='secondary'
                                style={{ marginTop: '1rem' }}
                                block
                                onClick={this.onSubmitPet}
                            >בחר</Button>
                        </Collapse>

                        <Collapse isOpened={this.state.categoryOpen}>
                            {
                                this.state.todo === 'buy' ?
                                    <span style={{ fontSize: '1.0em' }} class=' lead pr-4'>מה תרצה לקנות?</span> :
                                    <span style={{ fontSize: '1.0em' }} class=' lead pr-4'>באיזה נושא תרצה להתייעץ?</span>
                            }

                            <div class="robot-categories pt-2">
                                {categories.map(({ _id, name }) => (
                                    <Col key={_id} align="right" className='pt-0 '>
                                        <label class="checkbox_item">
                                            <input onChange={this.onChange} class="ml-2" type="radio" name="category" defaultValue={name} />
                                            <small>{name}</small>
                                        </label>
                                    </Col>
                                ))}
                            </div>
                            <Button outline
                                size="sm"
                                className="filter-btn"
                                color='secondary'
                                style={{ marginTop: '1rem' }}
                                block
                                onClick={this.onSubmitCategory}
                            >בחר</Button>
                        </Collapse>
                        <hr style={{ width: "80%" }} />

                        <button style={{ fontSize: '1.0em' }} class="lead collapse-filter-btn" onClick={this.reset}>
                            התחל מחדש כאן
                    </button>

                    </Collapse>
                    <button style={{ fontSize: '1.0em' }} class="lead collapse-filter-btn" onClick={this.CollapseHangdle}>

                        {filterBtnSymbol}
                    </button>
                </div>
            </Fragment>
        );
    }
}



const mapStateToProps = (state) => ({
    auth: state.auth,
    item: state.item,
    pet: state.pet,
    isAuthenticated: state.auth.isAuthenticated,
    age: state.age,
    category: state.category

});

export default connect(
    mapStateToProps,
    { getItems, getAges, getFilterItems, getPets, getCategories, getMinMaxPrice }
)(Robot);
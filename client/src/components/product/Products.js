import React, { Component, Fragment } from 'react';
import {
     Row, Container, Spinner
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getItems, deleteItem, getFilterItems } from '../../actions/itemActions';
import { getAges } from '../../actions/ageActions';
import { getPets, getPet } from '../../actions/petActions';
import { getCategories } from '../../actions/categoryActions';

import AddItemModal from './AddItemModal';
import Item from './Item';
import SideBarFilterItem from './SideBarFilterItem';
import { relativeTimeRounding } from 'moment';

class ShoppingList extends Component {


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

    render() {
        const { isAuthenticated, user } = this.props.auth;
        var { items, loading } = this.props.item;
        const is_admin = (isAuthenticated && user.admin);

        return (

            <Fragment>


                <Container className='mb-5'>
                    <SideBarFilterItem />

                    <div class="main">
                        {is_admin &&
                            <AddItemModal />
                        }

                    { loading? 
                        <div style={{position:'relative', height:'333px'}}><Spinner style={spinnerStyle} color="secondary" /></div>
                        :
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
                    } 
                    </div>
                </Container>

            </Fragment>
        );
    }
}

const spinnerStyle = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '3rem', height: '3rem' 
  };

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
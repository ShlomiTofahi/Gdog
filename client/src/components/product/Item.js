import React, { Component, Fragment } from 'react';
import {
    Card, Button, CardTitle, CardText, CardBody, CardImg, Col, CardFooter
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';

import { deleteItem, ratingItem, viewsItem } from '../../actions/itemActions';

import ItemDetails from './ItemDetails';
import EditItemModal from './EditItemModal';

class Item extends Component {
    state = {
        path: '/uploads/items/',
        rating: 0,
        itemClicked: false
    };

    static protoType = {
        ratingItem: PropTypes.func.isRequired,
        viewsItem: PropTypes.func.isRequired,
        auth: PropTypes.object
    }

    onDeleteClick = (id, itemImage) => {
        this.props.deleteItem(id);

        const noImageFullpath = this.state.path + 'no-image.png';
        const filepath = itemImage;
        if (filepath !== '' && filepath != noImageFullpath) {
            const formData = new FormData();
            formData.append('filepath', filepath);
            formData.append('abspath', this.state.path);

            axios.post('/remove', formData);
        }
    }

    ratingChanged = (_id, rating) => {

        var ratedItemList = localStorage.getItem('ratedItemList');
        if (ratedItemList == null)
            ratedItemList = [];

        if (!ratedItemList.includes(String(_id))) {
            this.props.ratingItem(_id, rating)
            ratedItemList = ratedItemList.concat(String(_id))
        }

        localStorage.setItem('ratedItemList', ratedItemList);

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
        var viewedItemList = localStorage.getItem('viewedItemList');
        if (viewedItemList == null)
            viewedItemList = [];

        if (!viewedItemList.includes(String(id))) {
            this.props.viewsItem(id)
            viewedItemList = viewedItemList.concat(String(id))
        }

        localStorage.setItem('viewedItemList', viewedItemList);

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
        const is_admin = (isAuthenticated && user.admin);

        const { _id, name, price, age, category, discount, itemImage, pet, breed, weight, rating, views } = this.props;
        rating.overall = (rating.overall % 1) > 0.85 ? rating.overall + 1 : rating.overall;
        return (

            <Fragment>
                <CSSTransition key={_id} timeout={500} classNames='fade'>
                    <Col xs="12" sm="6" md="4" className='pt-4' >
                        <div className='position-relative'>
                            <Card className={['products']} align="right" timeout={500}
                                style={{
                                    maxHeight: "500px", minHeight: "400px",
                                }}

                            >
                                {
                                    discount &&
                                    <div className="sales">
                                        <CardImg className='sales-img' src='/images/sales.png' />
                                        <small className="discount-text"><strong>{Math.floor(discount)}% הנחה</strong></small>
                                    </div>
                                }
                                <CardBody>
                                    {is_admin &&
                                        <div>
                                            <Button
                                                className='remove-btn'
                                                title="מחק"
                                                color='danger'
                                                size='sm'
                                                onClick={this.onDeleteClick.bind(this, _id, itemImage)}
                                            ><i class="fa fa-trash-o" aria-hidden="true"></i></Button>
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
            </Fragment>
        );
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { deleteItem, viewsItem, ratingItem }
)(Item);
import React, { Component, Fragment } from 'react';
import {
    CardText, Modal, ModalHeader, ModalBody, Card, CardFooter, CardBody, CardImg, Button
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';


class ItemDetail extends Component {
    state = {
        modal: true,
        dropDownPaymentOpen: false,
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
    }


    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    }

    close = () => {
        this.props.handleClickItemToFalse()
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
        this.setState({
            dropDownPaymentOpen: !this.state.dropDownPaymentOpen
        });
    }
    render() {
        const { items } = this.props.item;

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
                                    <CardText className={["mb-2 text-muted", "pb-3"]}>
                                        <FroalaEditorView model={item.description} />
                                    </CardText>
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
                                <small class='pr-3'>  התשלום מתבצע דרך bit לדרכי ביצוע תשלום  <a style={{ color: 'orange' }} class='contact-btn' href='/products/payment'>
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
    category: state.category,
    age: state.age
});

export default connect(
    mapStateToProps,
    {}
)(ItemDetail);

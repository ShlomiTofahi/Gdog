import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getItems, getFilterItems, getMinMaxPrice } from '../../actions/itemActions';
import { getAges } from '../../actions/ageActions';
import PropTypes from 'prop-types';
import ItemModal from '../itemModal';
import { getPets, getPet } from '../../actions/petActions';
import { getCategories } from '../../actions/categoryActions';
import { Collapse } from 'react-collapse';

class CoverImage extends Component {
    state = {
        path: "/images/home/",
    };

    dogItems = () => {
        const FiltedItems = {
            name: '',
            price: '',
            pet: 'כלב',
            breed: '',
            category: '',
            age: '',
            rating: ''
        };

        // Attempt to filter
        this.props.getFilterItems(FiltedItems);
    }

    catItems = () => {
        const FiltedItems = {
            name: '',
            price: '',
            pet: 'חתול',
            breed: '',
            category: '',
            age: '',
            rating: ''
        };

        // Attempt to filter
        this.props.getFilterItems(FiltedItems);
    }
    render() {

        return (
            <Fragment>



                    <div class="main-box box1" style={{ backgroundImage: `url(${this.state.path}cover_image.jfif)`, right: '0' }}></div>

                    <Container>

                        <div class="grid-container">

                            <Link onClick={this.dogItems} align='center' style={{ textDecoration: 'none' }} to='/products'>
                                <div class="box box2" style={{ backgroundImage: `url(${this.state.path}dog.jpg)` }}>
                                    <h1 className={"title display-1 font-weight-normal"}>כלבים</h1>
                                    <p style={{ fontSize: '1.5em' }} className={"lead font-weight-normal"}>מזון יבש לכלבים</p>
                                </div>
                            </Link>
                            <Link onClick={this.catItems} align='center' style={{ textDecoration: 'none' }} to='/products'>
                                <div class="box box2" style={{ backgroundImage: `url(${this.state.path}cat.jpg)` }}>
                                    <span className={"title display-1 font-weight-normal"}>חתולים</span>
                                    <p style={{ fontSize: '1.5em' }} className={"lead font-weight-normal"}>מזון יבש לחתולים</p>
                                </div>
                            </Link>
                            <Link onClick={this.catItems} align='center' style={{ textDecoration: 'none' }} to='#'>
                                <div class="box box2" style={{ backgroundImage: `url(${this.state.path}haircut-dog.jpg)` }} >
                                    <span className={"title display-1 font-weight-normal"}>תספורות</span>
                                    <p style={{ fontSize: '1.5em' }} className={"lead font-weight-normal"}>קביעת תור לתספורת מקצועית <br />למגוון רחב של כלבים</p>
                                </div>
                            </Link>
                            <Link onClick={this.catItems} align='center' style={{ textDecoration: 'none' }} to='/forum'>
                                <div class="box box2" style={{ backgroundImage: `url(${this.state.path}forum.jpg)` }} >
                                    <span className={"title display-1 font-weight-normal"}>הקהילה שלנו</span>
                                    <p style={{ fontSize: '1.5em' }} className={"lead font-weight-normal"}>שתפו רעיונות, שאלו שאלות, קבלו עצות<br /> הכל במקום אחד!</p>
                                </div>
                            </Link>
                            <Link onClick={this.catItems} align='center' style={{ textDecoration: 'none' }} to='/about'>
                                <div class="box box2" style={{ backgroundImage: `url(${this.state.path}about-us.jpg)` }} >
                                    <span className={"title display-1 font-weight-normal"}>קצת עלינו</span>
                                    <p style={{ fontSize: '1.5em' }} className={"lead font-weight-normal"}>הסיפור שלנו והתרומה שלנו אליכם</p>
                                </div>
                            </Link>
                            <Link onClick={this.catItems} align='center' style={{ textDecoration: 'none' }} to='/contact'>
                                <div class="box box2" style={{ backgroundImage: `url(${this.state.path}dog-phone.jpg)`,  }} >
                                    <span className={"title display-1 font-weight-normal"}>פה בשבילכם!</span>
                                    <p style={{ padding: '5px',fontSize: '1.5em' }} className={"lead font-weight-normal"}>צרו איתנו קשר להזמנות, המלצות או סתם חוות דעת</p>
                                </div>
                            </Link>
                            {/* <div class="box box2" style={{ backgroundImage: `url(${this.state.path}4.jpg)` }}>4</div>
                            <div class="box box2" style={{ backgroundImage: `url(${this.state.path}5.jpg)` }}>4</div>
                            <div class="box box2" style={{ backgroundImage: `url(${this.state.path}6.jpg)` }}>4</div>
                            <div class="box box2" style={{ backgroundImage: `url(${this.state.path}7.jpg)` }}>4</div> */}


                        </div>
                    </Container>
                {/* <img class="big_pic" style={{ width: '100%' }} src='/uploads/nike_02.jpg' alt='' /> */}

            </Fragment>

            // <div className={"site-header sticky-top py-1"}>
            // <div class="big_pic">
            // 	<img src="/uploads/nike_02.jpg"/>
            // </div>
            //     <div className={"position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light"}>
            //         <div className={"col-md-5 p-lg-5 mx-auto my-5"} >
            //             <h1 className={"display-4 font-weight-normal"}>Punny headline</h1>
            //             <p className={"lead font-weight-normal"}>And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple’s marketing pages.</p>
            //             <a className={"btn btn-outline-secondary"} href="#">Coming soon</a>
            //         </div>
            //         <div className={"product-device shadow-sm d-none d-md-block"}></div>
            //         <div className={"product-device product-device-2 shadow-sm d-none d-md-block"}></div>
            //     </div>

            //     <Row>
            //     <div className={"d-md-flex flex-md-equal w-100 my-md-3 pl-md-3"}>
            //     <Col sm={{ size: '6', offset: 1 }}>
            //         <div claclassNamess={"bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden"}>
            //             <div className={"my-3 py-3"}>
            //                 <h2 className={"display-5"}>Another headline</h2>
            //                 <p className={"lead"}>And an even wittier subheading.</p>
            //             </div>
            //             <div className={"bg-light shadow-sm mx-auto"} style={{width: '80%', height: '300px', borderRadius: '21px 21px 0 0'}}></div>

            //         </div>
            //         </Col>
            //         <Col sm={{ size: '6', offset: 1 }}>

            //         <div className={"bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden"}>
            //             <div className={"my-3 p-3"}>
            //                 <h2 className={"display-5"}>Another headline</h2>
            //                 <p className={"lead"}>And an even wittier subheading.</p>
            //             </div>
            //             <div class={"bg-dark shadow-sm mx-auto"} style={{width: '80%', height: '300px', borderRadius: '21px 21px 0 0'}}></div>
            //         </div>
            //         </Col>

            //     </div>
            //     </Row>

            //     </div>

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
    { getItems, getAges, getFilterItems, getPets, getPet, getCategories, getMinMaxPrice }
)(CoverImage);
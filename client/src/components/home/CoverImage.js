import React, { Component, Fragment } from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getFilterItems } from '../../actions/itemActions';

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
                    <div class="main-box box1" style={{ backgroundImage: `url(${this.state.path}cover_image.jfif)`, right: '0' }} />
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
                            <Link onClick={this.catItems} align='center' style={{ textDecoration: 'none' }} to='/haircut'>
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
                        </div>
                    </Container>
            </Fragment>
        );
    }
}


export default connect(
    null,
    { getFilterItems }
)(CoverImage);
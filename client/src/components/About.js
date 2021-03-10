import React, { Component } from 'react'
import { Row, Col, Container } from 'reactstrap';
import peopleCommunity20Filled from '@iconify-icons/fluent/people-community-20-filled';

import { Icon, InlineIcon } from '@iconify/react';
import cutIcon from '@iconify-icons/whh/cut';
import combIcon from '@iconify-icons/si-glyph/comb';
import shopIcon from '@iconify-icons/entypo/shop';
import petsIcon from '@iconify-icons/dashicons/pets';

export default class About extends Component {

    aboutStyle = () => {
        return {
            border: '1px solid rgb(230, 230, 230)',
            webkitBorderRadius: '15px',
            mozBorderRadius: '15px',
            borderRadius: '15px',
            marginTop: '10%',
            padding: '30px',

            webkitBoxShadow: '0 0 5px 0.1px #C7C7C7',
            boxSshadow: '0 0 5px 0.1px #C7C7C7'
        };
    };
    imgStyle = () => {
        return {
            // border: '1px solid rgb(230, 230, 230)',
            width: '90%',
            display: 'inline',
            webkitBorderRadius: '35px',
            mozBorderRadius: '35px',
            borderRadius: '35px',
        };
    };
    render() {
        return (
            <div class='about-fullpage' align='right'>
                <Container className='mt-4 mb-4'>
                    <h1 class="brand"><span><strong>GDog</strong></span><Icon icon={petsIcon} /> | About Us</h1>
                    <div class="wrapper animated bounceInLeft">
                        <div class="company-info about-company-info text-center">
                            <div style={iconStyle}>
                                <Icon icon={peopleCommunity20Filled} width="80" />
                                <span class='lead d-block'>קהילה תומכת</span>
                            </div>
                            <div class="haircut-iconn-container" style={iconStyle}>
                                <Icon icon={cutIcon} width="80"  />
                                <div class="overlay">
                                    <Icon icon={combIcon} width="80"  />
                                </div>
                                <span class='lead d-block'>תספורת איכותית</span>
                            </div>
                            <div style={iconStyle}>
                                <Icon icon={shopIcon} width="80" />
                                <span class='lead d-block'>מתאים לכל כיס</span>
                            </div>
                            <div style={iconStyle}>
                                <img style={petfoodStyle} src='/images/pet-food.png' alt='' />
                                <span class='lead d-block'>שקי אוכל ברמה גבוה</span>
                            </div>
                            <div style={iconStyle}>
                                <img style={petfoodStyle} src='/images/delivery.png' alt='' />
                                <span class='lead d-block'>עובדים במתכונת משלוחים</span>
                            </div>
                        </div>
                        <div class="contact">
                            {/* <h3 class='mb-3'>אז למה לכם בעצם, ומה אנחנו מציעים?</h3> */}
                            <div align="right" style={this.aboutStyle()}>
                                <fieldset>
                                    <legend><h1 class='display-4' style={{ color: '#4d7448', opacity: '0.4' }}>אז למה לכם בעצם, ומה אנחנו מציעים?</h1></legend>
                                    <Row>

                                        <p class='lead' style={aboutTextStyle}>

                                            הדף נוצר לאפשר לכל אדם שאוהב ומגדל כלב או חתול  לקבל את כל המידע, העדכונים והשירותים. מחירים שווים לכל כיס!
                                            משפחה המגדלת כלב או חתול  זקוקה לא פעם לשירותים שונים הקשורים לבעלי חיים  ולמידע מהימן ואיכותי, שיכול לסייע לה בתהליך הגידול.  ברגע שעשיתם את הבחירה להיכנס לאתר הצטרפתם לקבוצה גדולה יותר של אנשים שיש להם מכנה משותף, אנחנו פה על מנת לספק לכם כל מה שאתם צריכים באהבה רבה🧡
                                            הדף לאוהבי בעלי חיים מאפשר לקוראיו להיחשף למגוון תכנים איכותיים  לצד עצות פורום וטיפים נגישים, שאפשר ליישם.
                                            יש לשים לב שהאתר אינו לוקח אחריות! הטיפים והעצות הניתנים בפורום לא מחליפים התייעצות מומחים, בכל עניין רצוי וכדאי לפנות גם לוטרינר/מאלף מוסמך.
                                        </p>

                                    </Row>

                                </fieldset>
                            </div>

                        </div>
                    </div>
                </Container>
            </div>


        )
    }
}
const iconStyle = {
    position: 'relative',
    // letf: '50%',
    // right: '35%',
    opacity: '0.8',
    marginBottom: '25px'
}
const petfoodStyle = {
    position: 'relative',
    // letf: '50%',
    // right: '35%',
    width: '30%',
    transform: 'scaleX(-1)',
}
const aboutTextStyle = {
	webkitColumnCount:'2',
	mozColumCount:'2',
	columnCount:'2',
    columnGap: '40px'

}
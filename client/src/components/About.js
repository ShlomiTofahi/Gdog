import React, { Component } from 'react'
import { Row, Col, Container } from 'reactstrap';

export default class About extends Component {

    aboutStyle = () => {
        return {
            border: '1px solid rgb(230, 230, 230)',
            borderRadius: '5%',
            marginTop: '30px',
            padding: '30px',

            webkitBoxShadow: '0 0 5px 0.1px #C7C7C7',
            boxSshadow: '0 0 5px 0.1px #C7C7C7'
        };
    };
    imgStyle = () => {
        return {
            border: '1px solid rgb(230, 230, 230)',
            width: '90%',
            display: 'inline',
            borderRadius: '10%'
        };
    };
    render() {
        return (
            <Container className='mb-5'>
                <div align="right" style={this.aboutStyle()}>
                    <fieldset>
                        <legend><h1 class='display-4' style={{ color: '#7c6f5a7a' }}>אז למה לכם בעצם, ומה אנחנו מציעים?</h1></legend>
                        <Row>
                            <Col xs="12" sm="12" md="6" className='pt-4' >

                                <img style={this.imgStyle()} src='images/about.jpg' alt='' />
                            </Col>
                            <Col xs="12" sm="12" md="6" className='pt-4' >

                                <p class='lead'>

                                    הדף נוצר לאפשר לכל אדם שאוהב ומגדל כלב או חתול  לקבל את כל המידע, העדכונים והשירותים. מחירים שווים לכל כיס!
                                    משפחה המגדלת כלב או חתול  זקוקה לא פעם לשירותים שונים הקשורים לבעלי חיים  ולמידע מהימן ואיכותי, שיכול לסייע לה בתהליך הגידול.  ברגע שעשיתם את הבחירה להיכנס לאתר הצטרפתם לקבוצה גדולה יותר של אנשים שיש להם מכנה משותף, אנחנו פה על מנת לספק לכם כל מה שאתם צריכים באהבה רבה🧡
                                    הדף לאוהבי בעלי חיים מאפשר לקוראיו להיחשף למגוון תכנים איכותיים  לצד עצות פורום וטיפים נגישים, שאפשר ליישם.
                                    יש לשים לב שהאתר אינו לוקח אחריות! הטיפים והעצות הניתנים בפורום לא מחליפים התייעצות מומחים, בכל עניין רצוי וכדאי לפנות גם לוטרינר/מאלף מוסמך
                                </p>
                            </Col>

                        </Row>

                    </fieldset>
                </div>
            </Container>
        )
    }
}

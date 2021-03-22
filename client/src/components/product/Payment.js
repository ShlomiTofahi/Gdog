import React, { Component } from 'react'
import { Row, Container, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import { Icon, InlineIcon } from '@iconify/react';
import petsIcon from '@iconify-icons/dashicons/pets';

export default class Payment extends Component {
    state = {
        modal: false
    };

    paymentStyle = () => {
        return {
            border: '1px solid rgb(230, 230, 230)',
            webkitBorderRadius: '15px',
            mozBorderRadius: '15px',
            borderRadius: '15px',
            padding: '30px',

            webkitBoxShadow: '0 0 5px 0.1px #C7C7C7',
            boxSshadow: '0 0 5px 0.1px #C7C7C7'
        };
    };
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    render() {
        return (
            <div class='payment-fullpage' align='right'>
                <Container className='mt-4 mb-4'>
                    <h1 class="brand"><span><strong>GDog</strong></span><Icon icon={petsIcon} /> | Payment</h1>
                    <div class="wrapper animated bounceInLeft">
                        <div class="payment-info">
                            <h3>דגשים חשובים</h3>
                            <ul class='mr-2' style={{ listStyleType: 'circle' }}>
                                <li>העברת התשלום למספר 050-2130027</li>
                                <li>יש לציין את שם הפריט בתיאור העברה</li>
                                <li>המחיר לא כולל משלוח</li>
                                <li>יש להתקשר לאחר ביצוע התשלום לווידוא העברה</li>
                            </ul>
                            <Button size='sm'><i class="fa fa-hand-paper-o" onClick={this.toggle} aria-hidden="true"> תקנות תשלום באתר </i></Button>
                            <Modal align="right" isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader cssModule={{ 'modal-title': 'w-100 text-center' }} toggle={this.toggle}>תקנות תשלום באתר</ModalHeader>
                                <ModalBody>
                                    <p>
                                        <strong>אתר _gdog.co.il_ ("האתר") המופעל ע"י חברת _גולן משמש גם בתור אתר מכירות לרכישת ___מוצרי בעלי חיים</strong><br /><br />
                                        <small><ul class='mr-2' style={{ listStyleType: 'circle' }}>
                                            <li>האמור בתקנון זה בלשון זכר הוא לשם הנוחות בלבד והתקנון מתייחס לבני שני המינים באופן שווה.</li>
                                            <li>הרכישה באמצעות האתר כפופה לתנאים המפורטים בתקנון זה.</li>
                                            <li>עצם רכישת המוצר באתר תהווה הצהרה מצד הלקוח כי קרא את הוראות תקנון זה, הבין אותן והסכים להן. התקנון מהווה חוזה מחייב בינך לבין החברה.</li>
                                            <li>יש להתקשר לאחר ביצוע התשלום לווידוא העברה</li>
                                        </ul></small>

                                        <strong>הרכישה</strong><br />
                                        <small> <ul class='mr-2' style={{ listStyleType: 'circle' }}>
                                            <li> האתר מאפשר ללקוחות קנייה נוחה, קלה ובטוחה של המוצר באמצעות האינטרנט.</li>
                                            <li>ניתן לרכוש את המוצר באתר בכל עת עד לגמר המלאי.</li>
                                            <li>הרכישה באתר הינה באמצעות כרטיס אפלקיציה ביט בלבד והעסקה תתבצע לאחר אישורה ע"י חברת האשראי.</li>
                                            <li>מחיר המוצר באתר כולל את המע"מ.</li>
                                            <li>החברה שומרת לעצמה את הזכות להפסיק את שיווק ומכירת המוצר בכל עת וכן לשלול זכות רכישה באתר מכירות על פי שיקול דעתה.</li>
                                        </ul></small>

                                        <strong>החזרות וביטולים</strong><br />
                                        <small> <ul class='mr-2' style={{ listStyleType: 'circle' }}>
                                            <li>ניתן לבטל את העסקה באמצעות פניה טלפונית או בדואר אלקטרוני לשירות הלקוחות של החברה. ביטול העסקה יהיה בתוקף אך ורק לאחר קבלת פקס או דואר אלקטרוני מהחברה המאשר את הבקשה לביטול העסקה. במקרה שהביטול אושר – יש להשיב את המוצר לחברה כאשר כל העלויות הכרוכות בהחזרת המוצר תחולנה על הלקוח. החזרת המוצר תיעשה כשהוא באריזתו המקורית בצירוף החשבונית המקורית ושעדיין לא חלפו 14 יום מתאריך רכישת המוצר.</li>
                                            <li>במקרה של ביטול העסקה, תחזיר החברה ללקוח את תשלום על המוצר.</li>
                                            <li>אם ביטול העסקה יתבצע לאחר שהלקוח כבר קיבל את המוצר לרשותו, הלקוח יישא בעלות משלוח המוצר חזרה לחברה, זאת בנוסף לדמי הביטול.</li>
                                            <li>מדיניות ביטול העסקה המפורטת לעיל תחול רק ביחס למוצרים שנרכשו באתר. החברה לא תטפל בהחזרת מוצרים שנרכשו באמצעות מקור אחר.</li>
                                        </ul></small>

                                        <strong>אספקה והובלת המוצר</strong><br />
                                        <small> <ul class='mr-2' style={{ listStyleType: 'circle' }}>
                                            <li>החברה תדאג לאספקת המוצר ללקוח לכתובת שהוקלדה על ידו בעת ביצוע הרכישה באתר מכירות, תוך 7 ימי עסקים.</li>
                                            <li>החברה לא תהא אחראית לכל איחור ו/או עיכוב באספקה ו/או אי-אספקה, שנגרמה כתוצאה מכוח עליון ו/או מאירועים שאינם בשליטתה.</li>
                                            <li>משלוח המוצר יבוצע לכתובת שנמסרה ע"י הלקוח בעת הרכישה, ויש באפשרות נוספת ללקוח לאסוף את  באופן עצמאי.אינו כולל את עלות המשלוח.</li>
                                        </ul></small>

                                        <strong>שירות לקוחות</strong><br />
                                        <small> <ul class='mr-2' style={{ listStyleType: 'circle' }}>
                                            <li>בכל שאלה או בירור לגבי המוצר, ניתן לפנות אל נציגי השירות של החברה בטלפון 0502130027</li>
                                        </ul></small>

                                        <strong>אחריות ושירות</strong><br />
                                        <small> <ul class='mr-2' style={{ listStyleType: 'circle' }}>
                                            <li>האחריות למוצר מכסה פגמים מהותיים בגוף המוצר ו/או פעולתו אשר נגרמו על ידי החברה.</li>
                                            <li>האחריות תקפה רק לגבי לקוח המחזיק בידיו הוכחת קנייה מקורית ורק אם הרכישה נעשתה באמצעות החנות האתר מכירות _gdog.co.il_. החברה שומרת לעצמה את הזכות לדרוש מהלקוח להוכיח כי הינו הרוכש המקורי של המוצר.</li>
                                            <li>הסעד הבלעדי לכל מוצר פגום המכוסה במסגרת האחריות מוגבל לתיקון או להחלפה של המוצר הפגום. החבות הכוללת של החברה ביחס לכל מוצר פגום לא תעלה בשום מקרה על מחיר הרכישה של המוצר הפגום.</li>
                                            <li>אחריות החברה לא תחול במקרים בהם הפגם במוצר נגרם כתוצאה מהפעלה שגויה : הלקוח</li>
                                            <li>החברה לא תהא אחראית לכל נזק ישיר או עקיף הנובע מהשימוש או השימוש השגוי במוצר לרבות כל נזק מקרי, מיוחד, עקיף או תוצאתי – ככל שהחוק מתיר זאת. על הלקוח חלה האחריות וכל סיכון וחובות עבור אובדן, נזק וחבלה לגופו ו/או לרכושו ו/או לרכושם ו/או לגופם של צדדים שלישיים, הנובעים מהשימוש ו/או אי השימוש במוצר, למעט במקרים בהם נקבע כי הנזק האמור נגרם עקב רשלנותה הבלעדית של החברה.</li>
                                        </ul></small>

                                        <strong>קניין רוחני</strong><br />
                                        <small> <ul class='mr-2' style={{ listStyleType: 'circle' }}>
                                            <li>כל זכויות הקניין הרוחני באתר מכירות זה הינן רכושה הבלעדי של החברה ____.</li>
                                            <li>אין להעתיק, לשכפל, להפיץ, לפרסם או להשתמש בכל דרך אחרת במידע כלשהו מן האתר ו/או מאתר מכירות זה, אלא אם ניתנה הסכמה לכך מראש ובכתב מטעם החברה.</li>
                                        </ul></small>
                                   </p>
                                </ModalBody>
                            </Modal>
                        </div>
                        <div class="payment">
                            <div align="right" style={this.paymentStyle()}>
                                <fieldset>
                                    <h2 class='display-4 mb-4' style={window.innerWidth >= 992 ? { color: '#8a5e5e', opacity: '0.4' } : { color: '#4d7448', opacity: '0.4', fontSize: '2.0em' }}>
                                        התשלום מתבצע דרך ביט</h2>
                                    <Row className='pr-0 pr-sm-3'>

                                        <p class='lead'>
                                            <h4>מה זה bit?</h4>אפליקצייה להעברת כספים כולל קבוצות.
                                        </p>
                                        <p class='lead'>
                                            <h4>איך אפשר להעביר כסף?</h4>
                                            נכנסים אל ׳העבר׳ בוחרים את איש הקשר אליו רוצים להעביר (׳למי׳) מציינים את הסכום (׳כמה׳) וכדאי גם לציין את סיבת ההעברה (׳למה׳). מציינים את הסיסמה ו...הכסף בדרך.
                                        </p>
                                        <p class='lead'>
                                            <h4>אפשר לשלם כסף למי שלא מופיע באנשי קשר שלי?</h4>
                                            לחיצה על כפתור "העבר" , בחירה ב"העברה ל"מספר שאינו באנשי קשר", הזנה של מספר הטלפון וזהו. בנוסף, אפשר להעביר כסף באמצעות "העבר בסריקה".
                                        </p>
                                        <p class='pr-5'> לפרטים נוספים:</p><a class=' text-center' href='https://www.poalimsites.co.il/bit/index.html' target="_blank">
                                            <img style={bitIconStyle} src='/images/bit-icon.png' alt='' />
                                        </a>
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
const bitIconStyle = {
    width: '20%',
}
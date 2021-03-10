const express = require('express');
const router = express.Router();
const config = require('config');
const sendmail = require('sendmail')();

//User Model
const User = require('../../models/User');

// @route   GET api/contacts/mail-sending
// @desc    Sending Mail To Admin
// @access  Public
router.post('/mail-sending', (req, res) => {
    const { email, name, phone, title, message } = req.body;
    //Simple validation
    if (!email || !name || !phone || !title || !message) {
        return res.status(400).json({ msg: 'אנא הכנס את המייל שלך' });
    }
    try {

        const output = `
        <p>יש לך בקשה ליצירת קשר חדשה</p>
        <h3>פרטי קשר:</h3>
        <ul>  
          <li>שם: ${name}</li>
          <li>אימייל: ${email}</li>
          <li>טלפון: ${phone}</li>
        </ul>
        <h2>נושא: ${title} </h2>
        <h3>הודעה:</h3>
        <p>${message}</p>
      `;
        sendmail({
            from: email,
            to: config.get('adminMail'),
            subject: title,
            html: output
        }, function (err, reply) {
            console.log(err && err.stack)
            console.dir(reply)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error })
    }
});


module.exports = router;
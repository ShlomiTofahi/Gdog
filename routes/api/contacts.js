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
    console.log(req.body)
    const { email, name, phone, title, message } = req.body;
    //Simple validation
    if (!email || !name || !phone || !title || !message) {
        return res.status(400).json({ msg: 'אנא הכנס את המייל שלך' });
    }
    try {
          sendmail({
    from: 'shlomitofahi@outlook.com',
    to: 'shlomitofahi@gmail.com',
    subject: 'Hello World',
    html: 'Mail of test sendmail '
  }, function (err, reply) {
    console.log(err && err.stack)
    console.dir(reply)
  })
        // sendmail({
        //     from: email,
        //     to: config.get('adminMail'),
        //     subject: title,
        //     html: message
        // }, function (err, reply) {
        //     if (err) {
        //         console.log(err && err.stack)
        //         return res.status(400).json({ msg: 'תקלה בשליחת המייל' });
        //     }
        //     console.dir(reply)
        //     return res.json({ msg: 'המייל נשלח בהצלחה, תודה לפנייתך!' });

        // })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error })
    }
});


module.exports = router;
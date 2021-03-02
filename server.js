const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const fileUpload = require('express-fileupload');
const nodemailer = require('nodemailer');
const sendmail = require('sendmail')();

var fs = require('fs');

const app = express();

//Bodyparser Middleware
app.use(express.json());

app.use(fileUpload());

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  const { filename, abspath } = req.body;
  file.mv(`${__dirname}/client/public${abspath}${filename}`, err => {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({ fileName: filename, filePath: `${abspath}${filename}` });
  });
});
// Remove Endpoint
app.post('/remove', (req, res) => {
  if (req.body === null) {
    return res.status(400).json({ msg: 'No file to remove' });
  }
  const { filepath } = req.body;

  fs.unlinkSync(`${__dirname}/client/public/${filepath}`);

});


app.post('/send-mail', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h2>title: ${req.body.title} </h2>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;
  sendmail({
    from: 'shlomitofahi@outlook.com',
    to: 'shlomitofahi@gmail.com',
    subject: 'Hello World',
    html: 'Mail of test sendmail ',
    devHost: 'localhost' // Default: localhost

  }, function (err, reply) {
    console.log(err && err.stack)
    console.dir(reply)
  })
  

});

// DB Config   
const db = config.get('mongoURI');

// setting MongoDB
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log('mongoDB Connected..'))
  .catch(err => console.log(e));

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/pets', require('./routes/api/pets'));
app.use('/api/breeds', require('./routes/api/breeds'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/categories', require('./routes/api/categories'));
app.use('/api/comments', require('./routes/api/comments'));
app.use('/api/ages', require('./routes/api/ages'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
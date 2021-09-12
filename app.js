const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb+srv://sunny:UuCU1dbrG6vrM3lL@cluster0.itqxl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true}).catch(e=>{console.log(e)});
const port = 8000;


// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    desc: String,
    address: String
  });

  const Contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({extended:true}))

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
// app.get('/', (req, res)=>{
//     const con = "This is the best content on the internet so far so use it wisely"
//     const params = {'title': 'PubG is the best game', "content": con}
//     res.status(200).render('index.pug', params);
// })
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")     
    })

    // res.status(2de00).render('contact.pug');
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
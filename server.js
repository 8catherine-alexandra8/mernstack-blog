//starting point for app
//require some of the downloaded dependencies.  path is built-in 
//in node library so didn't require installation like the rest but
//does need to be imported, via require, to use it
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
//initialize express application
const app = express();
//Define a port to run on 8080 or whatever port Heroku has available
//whenever the app runs
const PORT = process.env.PORT || 8080;
//import routes from api.js
const routes = require('./routes/api')
//store the mongodb connection string to a variable and replace the user
//name and pw to what was used to establish the new db user. **Code 
//refactored to use locally installed MongoDB so commented out MONGODB_URI
//variable
//const MONGODB_URI = 'mongodb+srv://calexandra:Password@blogpostsdb.1ej0w.mongodb.net/test?retryWrites=true&w=majority'
//use mongoose.connect method to connect to mongoose.  **First param was originally
//built as MONGODB_URI but that variable was commented out as part of switching
//from Atlas to local MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/blog_posts', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//to verify that app is actually connected to a db as should be the case with
//the mongoose.connect code block above, add a mongoose listener that will
//console log a successful connection with db. set it to listen for the connection 
//event
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
})

//create some data for the mongo db ***This was all used for development 
//and testing of connections but is no longer needed now that this is 
//connected to an actual DB so commenting out through line 53.
// const data = {
//     title: 'Welcome to blog post #1',
//     body: 'This is a dummy post. Thanks for reading!' 
// }
//save the data to the mongo db by creating a a new blog post instance of the 
//mongoose model created above, and pass the data in and then use the .save method
//to save which takes a callback in case there's an error
//const newBlogPost = new BlogPost(data);
// newBlogPost.save((err) => {
//     if (err) {
//         console.log('Oops, something went wrong')
//     } else {
//         console.log('Data has been saved!')
//     }
// })

//set up some express middleware to parse any/all json coming in and 
//every url encoded, setting extended to false, since we our data
//is not deep at all.  True would be appropriate if we had a deeply nested
//object. These two lines are making all requests avaiable in req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//set app to start using morgan as an HTTP request logger
app.use(morgan('tiny'));
//configure the routes
app.use('/api', routes)

//Define a get route that sends a simple JSON back to the client
//and stores some data to test ability to store and send 
//some simple data.  The route will start at '/api'.  This route
//is used to make sure connections are working during the build but 
//will be overwritten with a different get route once the MongoDB
//connection is built which is why it's commented out now
//app.get('/api', (req,res) => {
    //const data = {
        //username: 'catherineAlexandra',
        //age: 34
    //}
    //res.json(data);
//})
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}
//set the app up to listen on the PORT defined above and 
//console log the PORT on which the server has spun up
app.listen(PORT, console.log(`Server is starting at ${PORT}`));


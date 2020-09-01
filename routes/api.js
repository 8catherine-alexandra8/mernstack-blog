const express = require('express');

const router = express.Router();

const BlogPost = require('../models/blogPost')

//cut get routes, originally built inside of server.js and paste them here:
//rewrite original get route (that is commented out insdie of server.js), 
//using Mongoose Model to find and send database
//data back to browser
//** originally built as app.get but replaced app with router upon cutting
//from server.js and pasting here
router.get('/', (req, res) => {
    BlogPost.find({})
        .then((data) => {
            console.log('Data: ', data)
            res.json(data);
        })
        .catch((err) => {
            console.log('Error: ', err)
        })
});
//add a post request to handle the form submission from the browser to the server
//declare a variable to hold the values in req.body, which will be the data coming 
//from the browser upon form submission.  Create a new instance of the BlogPost 
//mongoose model, passing in the data(the values coming from req.body)
//Once a new instance is declared, the .save method can be used to save and handle 
//any errors
router.post('/save', (req, res) => {
    console.log('Body: ', req.body);
    const data = req.body;
    const newBlogPost = new BlogPost(data);
    newBlogPost.save((err) => {
        if (err) {
            res.status(500).json({
                msg: 'Sorry, internal server error'
            })
            return;
        }
        return res.json({
            msg: 'Your data has been saved!'
        })
    })
})

//copied the one above to and modified to create a drilldown route
//from it
router.get('/name', (req, res) => {
    const data = {
        username: 'newman',
        age: 34
    }
    res.json(data);
})




module.exports = router;

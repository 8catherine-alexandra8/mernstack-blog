const mongoose = require('mongoose');

//define a mongoose Schema
const Schema = mongoose.Schema
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    }
})
//define a mongoose Model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;

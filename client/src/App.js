import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css'

export default function App() {
  const [completeBlogPost, setCompleteBlogPost] = useState({
    title: '',
    body: '',
  })
  const [dbBlogPosts, setdbBlogPosts] = useState([])

  useEffect(() => {
    async function getBlogPost() {
      await axios.get('/api')
        .then((response) => {
          const data = response.data;
          setdbBlogPosts(data);
          console.log('Data has been received');
      })
      .catch((err) => {
        console.log(err);
      })
    }
    getBlogPost();

  }, [completeBlogPost])


  function handleChange(event) {
    const {name, value} = event.target;
    
    setCompleteBlogPost((prevVal) => {
      return {
        ...prevVal,
        [name]: value
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      title: completeBlogPost.title,
      body: completeBlogPost.body
    }
  }
  function clearInputs() {
    setCompleteBlogPost({
      title: '',
      body: ''
    })
  }

  // function getBlogPost() {
  //   axios.get('/api')
  //     .then((response) => {
  //       const data = response.data;
  //       setdbBlogPosts([data]);
  //       console.log('Data has been received');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }

  axios({
    url: '/api/save',
    method: 'POST',
    data: payload
  })
    .then(()=> {
      console.log('Data has been sent to the server')
      clearInputs();
    })
    .catch((err) => {
      console.log('Internal Server Error')
    })
  
//function to display posts that takes posts as a param and returns null if 
//posts array is empty.  If it's not empty, then loop through the posts

  function displayBlogPosts(posts) {
    if (!posts.length) return null;
    return posts.map((post, index) => (
      <div key={index} className="blog-post__display">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  }

  return (
    <div className="app">
      <h2>Welcome to my Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <input
          type="text"
          name="title"
          placeholder="Title"
          value={completeBlogPost.title}
          onChange={handleChange}
          />
        </div>
        <div className="form-input">
          <textarea
            type="text"
            name="body"
            placeholder="Post Body"
            cols="30"
            rows="10"
            value={completeBlogPost.body}
            onChange={handleChange}
          >
          </textarea>
        </div>
          <button>Submit</button>
      </form>
      <div className="blog-posts">
        {displayBlogPosts(dbBlogPosts)}
      </div>
    </div>
  )

}
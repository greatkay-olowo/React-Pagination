import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Posts from './components/post';
import Pagination from './components/pagination';
import { Helmet } from 'react-helmet';
import './App.css';

//Setting Page Title
const Title = 'React Pagination';

//React Hook APIs
const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  //Fetch Post
  useEffect(
    () => {
      const fetchPosts = async () => {
        setLoading(true);
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(res.data);
        setLoading(false);
      }

      fetchPosts();
    }, []);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <Helmet>
        <title>{Title}</title>

      </Helmet>
      <div className="container mt-5">
        <h1 className='text-primary mb-3'>My Blog</h1>
        <Posts posts={currentPosts} loading={loading} />
        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
      </div>
    </React.Fragment>
  );
}

export default App;

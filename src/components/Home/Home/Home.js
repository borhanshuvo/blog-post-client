import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import './Home.css';
import Navbar from '../../Navbar/Navbar';
import Pagination from '../Pagination/Pagination';

const Home = () => {

    const [posts, setPosts] = useState([]);
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);

    function fakeRequest() {
        return new Promise(resolve => setTimeout(() => resolve(), 2500));
    }

    useEffect(() => {
        fetch('https://blooming-tor-90457.herokuapp.com/postList')
            .then(res => res.json())
            .then(data => setPosts(data));
        fakeRequest().then(() => {
            const el = document.querySelector(".loader-container");
            if (el) {
                el.remove();
                setLoading(!isLoading);
            }
        })
    }, [isLoading]);

    const blogPostId = (id) => {
        history.push(`singleBlogPost/${id}`);
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="container mb-4">
            <Navbar />
            <div className="row pt-5 mt-5">
                {currentPosts.map(post =>
                    <div className="col-md-4 col-sm-6 pb-3" key={post._id}>
                        <div className="card card-style h-100" onClick={() => blogPostId(post._id)}>
                            <p className="ms-auto pe-3 pt-3">{moment(post.postDate).format('LLLL')}</p>
                            <img src={`data:image/png;base64,${post.coverImage.img}`} className="img-fluid h-50" alt="" />
                            <div className="card-body text-center">
                                <h4 className="card-title">{post.title}</h4>
                            </div>
                        </div>
                    </div>
                )
                }
                <div className="d-flex justify-content-center mt-4">
                    <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
                </div>
            </div>
        </div>
    );
};

export default Home;
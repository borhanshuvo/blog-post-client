import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';

const SingleBlogPost = () => {

    const { id } = useParams();
    const [blogPost, setBlogPost] = useState({
        title: '',
        blogContent: '',
        coverImage: ''
    });

    useEffect(() => {
        fetch(`https://blooming-tor-90457.herokuapp.com/singleBlogPost/${id}`)
            .then(res => res.json())
            .then(data => setBlogPost({
                title: data.title,
                blogContent: data.blogContent,
                coverImage: data.coverImage.img
            }))
    }, [id]);
    console.log(`object`, blogPost)
    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="col-12 pb-5">
                    <div className="text-center pb-5 pt-5">
                        <img src={`data:image/png;base64,${blogPost.coverImage}`} className="img-fluid h-50" alt="" />
                    </div>
                    <div className="card-body text-center">
                        <h5 className="card-title pb-3">{blogPost.title}</h5>
                        <p className="card-text word-wrap text-start">{blogPost.blogContent}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBlogPost;
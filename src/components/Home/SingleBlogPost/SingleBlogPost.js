import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';

const SingleBlogPost = () => {

    const { id } = useParams();
    const [blogPost, setBlogPost] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/singleBlogPost/${id}`)
            .then(res => res.json())
            .then(data => setBlogPost(data))
    }, [id]);
    console.log(`object`, blogPost)
    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="col-12 pb-5">
                    {/* <img src={`data:image/png;base64,${blogPost.coverImage.img}`} className="img-fluid h-50" alt="" /> */}
                    <div className="card-body text-center">
                        <h5 className="card-title pb-3">{blogPost.title}</h5>
                        <p className="card-text text-start">{blogPost.blogContent}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBlogPost;
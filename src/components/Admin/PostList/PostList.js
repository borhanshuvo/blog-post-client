import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const PostList = () => {

    const [blogPosts, setBlogPosts] = useState([]);

    const [isLoading, setLoading] = useState(true);

    function fakeRequest() {
        return new Promise(resolve => setTimeout(() => resolve(), 2500));
    }

    useEffect(() => {
        fetch('http://localhost:5000/postList')
            .then(res => res.json())
            .then(data => setBlogPosts(data));
        fakeRequest().then(() => {
            const el = document.querySelector(".loader-container");
            if (el) {
                el.remove();
                setLoading(!isLoading);
            }
        })
    }, [isLoading]);

    const deleteBlogPost = (id) => {
        const loading = toast.loading('Please wait...!');

        fetch(`http://localhost:5000/deleteBlogPost/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    const newService = blogPosts.filter(blogPost => blogPost._id !== id);
                    setBlogPosts(newService);
                    return swal("Blog Post deleted ", "Blog Post deleted successfully", "success");
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
            .catch(error => {
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
    }

    const headingColor = { color: '#3A4256' };

    return (
        <div>
            <h4 className="pt-2 pb-2 ps-3" style={headingColor}>Manage Blog Post<hr /></h4>
            <div className="container">
                <div className="table-responsive mb-5">
                    <table className="table table-responsive">
                        <thead>
                            <tr className="text-center">
                                <th scope="col">#SL</th>
                                <th scope="col">Blog Post Title</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                blogPosts.map((blogPost, key) => (
                                    <tr key={blogPost._id}>
                                        <td className="text-center">{key + 1}</td>
                                        <td>{blogPost.title}</td>
                                        <td className="text-center"><button style={{ border: 'none' }} onClick={() => deleteBlogPost(blogPost._id)}><FontAwesomeIcon style={{ color: 'red' }} icon={faTrash} /></button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PostList;
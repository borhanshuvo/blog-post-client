import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import toast from 'react-hot-toast';

const AddPost = () => {

    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handelBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    }

    const handleFileChange = e => {
        const newFile = e.target.files[0];
        setFile(newFile);
    }

    const onSubmit = (data, e) => {
        const loading = toast.loading('Please wait...!');
        const formData = new FormData();
        const postDate = new Date();
        formData.append('file', file);
        formData.append('title', info.title);
        formData.append('blogContent', info.blogContent);
        formData.append('postDate', postDate);

        console.log(formData)

        fetch('http://localhost:5000/addPost', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                if (result) {
                    e.target.reset();
                    return swal("Post Added", "Post has been added successful.", "success");
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
        <div className="ps-3">
            <h4 className="ps-1 pt-2 pb-3" style={headingColor}>Add Blog Post<hr /></h4>
            <div className="card mb-5" style={{ width: '95%' }}>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-group pb-3">
                            <label htmlFor="title" className="pb-2">Title</label>
                            <input type="text" name="title" placeholder="Blog Title" id="title" className="form-control" aria-invalid={errors.title ? "true" : "false"} {...register('title', { required: true })} onBlur={handelBlur} />
                            {errors.title && (<span role="alert" className="text-danger"> Blog Title is required </span>)}
                        </div>
                        <div className="form-group pb-3">
                            <label htmlFor="blogContent" className="pb-2">Blog Content</label>
                            <textarea rows="6" cols="" name="blogContent" placeholder="Blog Content" id="blogContent" className="form-control" aria-invalid={errors.blogContent ? "true" : "false"} {...register('blogContent', { required: true })} onBlur={handelBlur}></textarea>
                            {errors.blogContent && (<span role="alert" className="text-danger"> Blog Content is required </span>)}
                        </div>

                        <div className="form-group pb-5">
                            <label htmlFor="img" className="pb-2">Cover Image</label>
                            <input type="file" name="img" id="img" className="form-control" aria-invalid={errors.img ? "true" : "false"} {...register('img', { required: true })} onChange={handleFileChange} />
                            {errors.img && (<span role="alert" className="text-danger"> Cover Image is required </span>)}
                        </div>

                        <div className="form-group pb-3">
                            <input type="submit" name="submit" className="btn btn-primary" />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPost;
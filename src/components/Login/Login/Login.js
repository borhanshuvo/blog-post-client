import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../../App';

import './Login.css';
import Navbar from '../../Navbar/Navbar';
import { useHistory, useLocation } from 'react-router';
import infoEmoji from '../../../images/info-emoji.svg'

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [adminDetails, setAdminsDetails] = useState([]);
    const [error, setError] = useState('none');
    const [show, setShow] = useState('block');
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: '/' } };

    useEffect(() => {
        fetch('https://blooming-tor-90457.herokuapp.com/adminDetails')
            .then(res => res.json())
            .then(data => setAdminsDetails(data))
    }, []);

    const onSubmitLogin = (data, event) => {

        adminDetails.forEach(adminDetail => {
            if ((data.email === adminDetail.email) && (data.password === adminDetail.password)) {
                const signedInUser = {
                    isSignedIn: true,
                    displayName: adminDetail.name,
                    email: adminDetail.email,
                    password: adminDetail.password
                }
                setLoggedInUser(signedInUser);
                setError('none');
                history.replace(from);
            }
            else {
                setError('block');
            }
        })
        event.target.reset();

    }

    return (
        <>
            <Navbar />
            <div className="container pt-5 mt-5 pb-5">
                <div className="row mt-5">
                    <div className="login-style">
                        <div>

                            <div style={{ display: show }} className="card pb-2">
                                <div className="d-flex justify-content-between pb-2">
                                    <strong><img src={infoEmoji} className="rounded me-2" alt="" />Important Information</strong>
                                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setShow('none')}></button>
                                </div>
                                <div className="text-center">
                                    <span>Email : test@test.com</span><br />
                                    <span>Password : #2021dev</span>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-center">Login</h4>
                                <form onSubmit={handleSubmit(onSubmitLogin)}>

                                    <div className="form-group pb-3">
                                        <label htmlFor="email" className="pb-2">Email</label>
                                        <input type="email" name="email" placeholder="e.g example@example.com" aria-invalid={errors.email ? "true" : "false"} {...register('email', { required: true })} id="email" className="form-control" autoComplete="off" />
                                        {errors.email && (<span role="alert" className="text-danger"> Email required </span>)}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password" className="pb-2">Password</label>
                                        <input type="password" name="password" placeholder="e.g At least 8 character" aria-invalid={errors.password ? "true" : "false"} {...register('password', { required: true, minLength: 8 })} id="password" className="form-control" autoComplete="off" />
                                        {errors.password && (<span role="alert" className="text-danger"> Password required & must contain at least 8 character </span>)}
                                    </div>

                                    <br />

                                    <div className="form-group pb-3 text-center" style={{ display: error }}>
                                        <span style={{ color: 'red' }}>Email or Password In-Correct</span>
                                    </div>

                                    <div className="form-group pb-3">
                                        <input type="submit" name="submitLogin" className="btn btn-primary form-control" />
                                    </div>

                                </form>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
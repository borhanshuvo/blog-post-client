import React, { useContext } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Sidebar from '../Sidebar/Sidebar';
import AddPost from '../AddPost/AddPost';
import PostList from '../PostList/PostList';
import { UserContext } from '../../../App';


const Dashboard = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div className="container mt-4">
            <div className='d-flex justify-content-between'>
                <Link className="navbar-brand text-uppercase text-dark" to="/"><b>Daily Blog</b></Link>
                <h5 className="pt-1 pe-2">{loggedInUser.displayName}</h5>
            </div> <hr />
            <div className="row pt-4">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <Switch>

                        <Route path="/dashboard/addPost">
                            <AddPost />
                        </Route>

                        <Route path="/dashboard/listPost">
                            <PostList />
                        </Route>

                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
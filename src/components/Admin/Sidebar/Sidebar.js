import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { faList, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../../../App';

const Sidebar = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const textColor = { color: '#3A3056' };

    return (
        <div>
            <Link style={textColor} className="nav-link" to="/dashboard/addPost"><FontAwesomeIcon icon={faPlus} /> Add Blog Post</Link>
            <Link style={textColor} className="nav-link" to="/dashboard/listPost"><FontAwesomeIcon icon={faList} /> Blog Post List</Link>
            <span className="ps-2"><button style={{ border: 'none', backgroundColor: 'white' }} onClick={() => setLoggedInUser({})}><FontAwesomeIcon icon={faSignOutAlt} /><span className="ps-1">Logout</span></button></span>
        </div>
    );
};

export default Sidebar;
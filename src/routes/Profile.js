import React from 'react'
import {authService} from "../fbase";
import {useHistory} from "react-router-dom";

const Profile = () => {
    const history = useHistory();
    const onLogoutClick = () => {
        authService.signOut();
        history.push('/'); // redirecting to root using react-router-dom
    }

    return (
        <>
            <button onClick={onLogoutClick}>Logout</button>
        </>
    )
};

export default Profile
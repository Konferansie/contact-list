import React from 'react';
import './UserExistMessage.css'

const UserExistMessage = ({name}) => {
    return (
        <div className="user-exist">
           Contact with name: <span style={{fontWeight:"bold", margin:'0 5px'}}> { name } </span> exist
        </div>
    );
};

export default UserExistMessage;
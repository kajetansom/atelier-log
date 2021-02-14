import React from 'react'
import classes from './UserTag.module.css';
import Giphy from "react-hooks-giphy";

const UserTag = (props) => {
    return (
        <div className={classes.UserTag}>
            <div className={classes.Gif}>
                <Giphy width="100px" tag="working" />
            </div>
            <span>{props.userName}</span>
        </div>
    )
}

export default UserTag

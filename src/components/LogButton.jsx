import React from 'react'
import classes from './LogButton.module.css';

const LogButton = (props) => {
    const classList = [classes.Button];
    if(props.logged) {
        classList.push(classes.LoggedIn)
    }

    return (
        <button className={classList.join(" ")} onClick={props.changeLog}>
            {props.logged ? "Leave" : "Login"}
        </button>
    )
}

export default LogButton

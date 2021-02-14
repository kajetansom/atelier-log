import React from 'react';
import classes from './NameSelect.module.css';

const nameList = [
    "Anna 1",
    "Anna 2",
    "Christoph",
    "Jasper",
    "Kajetan",
    "Leon",
    "Lucién",
    "Maxim",
    "Ronja",
    "Thy",
]

const NameSelect = (props) => {
    let options = "";
    console.log("select props:", props)
    if(props.logged) {
        console.log("only render selected name")
        options = <option value={props.selectedName}>{props.selectedName}</option>
    } else {
        let usersSelect = nameList.filter(user => !props.usersIn.includes(user));
        options = usersSelect.map((name, i) => {
            return <option key={i} value={name}>{name}</option>
        })
    }

    return (
        <select className={classes.Select} onChange={props.onChangeName} value={props.selectedName}>
            {options}
        </select>
    )
}

export default NameSelect;

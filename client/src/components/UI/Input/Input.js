import React from 'react';
import classes from './Input.module.css'


const Input = React.forwardRef( (props,ref) => {
    return (
        <fieldset className={classes.fieldset}>
            <label className={classes.labelField} htmlFor={props.id}>{props.label}</label>
            <input className={classes.inputField} type={props.type} {...props} ref={ref} />
        </fieldset>
    )
} )

export default Input;
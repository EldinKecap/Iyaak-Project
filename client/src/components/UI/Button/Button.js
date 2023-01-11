import classes from './Button.module.css'

const Button = props => {
    return (
        <>
        <button className={`${classes.button} ${props.className}`} type='submit' onClick={props.onClick}>{props.title}</button>
        </>
    )
}

export default Button;
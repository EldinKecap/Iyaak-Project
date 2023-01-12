import { useContext, useEffect, useRef, useState } from "react"
import LoginContext from "../../store/login-context"
import generateUserError from "../../validation/generateUserError"
import CreateUserForm from "../CreateUserForm/CreateUserForm"
import Button from "../UI/Button/Button"
import Card from "../UI/Card/Card"
import Input from "../UI/Input/Input"
import classes from "./LoginForm.module.css"

const LoginForm = () => {
    const [displayCreateUser, setDisplayCreateUser] = useState(false)
    const [invalidInput, setInvalidInput] = useState({})
    const loginCtx = useContext(LoginContext);
    const usernameRef = useRef();
    const passwordRef = useRef();


    function setLoginContextAndUser(user) {
        loginCtx.setLoggedIn(true);
        localStorage.setItem('loggedInUser', JSON.stringify(user));
    }

    async function fetchLogin() {

        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }

        let errorMessage = generateUserError(user);

        if (Object.keys(errorMessage).length > 0) {
            setInvalidInput(errorMessage)
            return;
        }

        const response = await fetch('http://localhost:5000/user/login', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();

        const isLogged = Object.keys(data).includes('login');
        if (isLogged) {
            setLoginContextAndUser(data);
        } else {
            errorMessage = data.errorMessage
            setInvalidInput(errorMessage)
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setInvalidInput({})
        }, 3000);
        return () => {
            clearTimeout(timeout)
        }
    }, [invalidInput])


    return (
        <>
            <div className={classes.backdrop}></div>
            <div className={classes.loginForm} >
                <Card className={classes.loginCard} onClick={displayCreateUser ? setDisplayCreateUser.bind(null, false) : () => { }}>
                    <Input label='Username'
                        id="usernameLogin"
                        type="text"
                        ref={usernameRef}
                    />
                    {invalidInput.username && <p>{invalidInput.username}</p>}
                    <Input label='Password'
                        id="passwordLogin"
                        type="text"
                        ref={passwordRef}
                    />
                    {invalidInput.password && <p>{invalidInput.password}</p>}
                    <Button className={classes.loginButton} title="Log in" onClick={fetchLogin} />
                    <Button className={classes.loginButton} title="Create Account" onClick={() => setDisplayCreateUser(true)} />
                </Card>
                {displayCreateUser && <CreateUserForm cardStyle={classes.loginCreateCard} login={setLoginContextAndUser} />}
            </div>
        </>
    )
}

export default LoginForm;
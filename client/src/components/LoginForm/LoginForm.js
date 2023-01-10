import { useContext, useRef, useState } from "react"
import LoginContext from "../../store/login-context"
import CreateAUserForm from "../CreateAUserForm/CreateAUserForm"
import Button from "../UI/Button/Button"
import Card from "../UI/Card/Card"
import Input from "../UI/Input/Input"
import classes from "./LoginForm.module.css"

const LoginForm = () => {
    const [displayCreateUser, setDisplayCreateUser] = useState(false)
    const loginCtx = useContext(LoginContext);
    const usernameRef = useRef();
    const passwordRef = useRef();


    async function fetchLogin() {
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }



        const response = await fetch('http://localhost:5000/user/login', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()

        console.log(data);
        if (Object.keys(data).includes('login')) loginCtx.setLoggedIn(true);
    }



    return (
        <>
            <div className={classes.backdrop}></div>
            <div className={classes.loginForm}>
                <Card>
                    <Input label='Username'
                        id="usernameLogin"
                        type="text"
                        ref={usernameRef} />
                    <Input label='Password'
                        id="passwordLogin"
                        type="text"
                        ref={passwordRef} />
                    <Button title="Log in" onClick={fetchLogin} />
                    <Button title="Create Account" onClick={()=>setDisplayCreateUser(true)}  />
                </Card>
                    {displayCreateUser && <CreateAUserForm />}
            </div>
        </>
    )
}

export default LoginForm;
import { useContext, useRef } from "react"
import LoginContext from "../../store/login-context"
import Button from "../UI/Button/Button"
import Card from "../UI/Card/Card"
import Input from "../UI/Input/Input"
import classes from "./LoginForm.module.css"

const LoginForm = () => {
    const loginCtx = useContext(LoginContext);
    const usernameRef = useRef();
    const passwordRef = useRef();
   

    async function fetchLogin() {
        const user = {
            username:usernameRef.current.value,
            password:passwordRef.current.value
        }

        

       const response = await fetch('http://localhost:5000/user/login',{
            method:'POST',
            mode: 'cors',
            body: JSON.stringify(user),
            headers:{
                'Content-Type':'application/json'
            }
        })

        const data = await response.json()

        console.log(data);
        if(Object.keys(data).includes('login')) loginCtx.setLoggedIn(true);
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
                    <Button title="Log in" onClick={fetchLogin}/>
                </Card>
            </div>
        </>
    )
}

export default LoginForm;
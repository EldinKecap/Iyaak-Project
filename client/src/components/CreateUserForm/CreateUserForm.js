import { useRef, useState } from "react"
import generateUserError from "../../validation/generateUserError";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";


const CreateUserForm = (props) => {
    const [invalidInput, setInvalidInput] = useState({})
    
    let firstNameRef = useRef();
    let lastNameRef = useRef();
    let usernameRef = useRef();
    let emailRef = useRef();
    let passwordRef = useRef();

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        let user = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        let errorMessage = generateUserError(user);
        if (Object.keys(errorMessage).length > 0) {
            setInvalidInput(errorMessage)
            return;
        }

        console.log(user);
        let response = await fetch('http://localhost:5000/user', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let data = await response.json()
        console.log('ispred');
        if (Object.keys(data).includes('_id')) {
            console.log("unutra");
            props.login({user:data});
            console.log(data);
        } else {
            errorMessage = data.errorMessage
            setInvalidInput(errorMessage)
            console.log(errorMessage);
        }
    }


    return (
        <Card className={props.cardStyle}>
            <form onSubmit={formSubmitHandler}>
                <h1>Create account</h1>
                <Input ref={firstNameRef} label="First Name" id="firstName" type="text" />
                {invalidInput.firstName && <p>{invalidInput.firstName}</p>}
                <Input ref={lastNameRef} label="Last Name" id="lastName" type="text" />
                {invalidInput.lastName && <p>{invalidInput.lastName}</p>}
                
                <Input ref={usernameRef} label="Username" id="username" type="text" />
                {invalidInput.username && <p>{invalidInput.username}</p>}
                
                <Input ref={emailRef} label="E-mail" id="email" type="email" />
                {invalidInput.email && <p>{invalidInput.email}</p>}
                
                <Input ref={passwordRef} label="Password" id="password" type="password" />
                {invalidInput.password && <p>{invalidInput.password}</p>}
                
                <Button title="Submit" />
            </form>
        </Card>
    )
}

export default CreateUserForm;
import { useRef } from "react";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";


const UpdateUserForm = () => {
    let idRef = useRef()
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

        console.log(user);
        let response = await fetch('http://localhost:5000/user/' + idRef.current.value, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let data = await response.json()
        console.log(data);
    }


    return (
        <Card>
            <form onSubmit={formSubmitHandler}>
                <h1>Update user</h1>
                <Input type='text' label='Enter ID' ref={idRef} />
                <Input ref={firstNameRef} label="First Name" id="firstName" type="text" />
                <Input ref={lastNameRef} label="Last Name" id="lastName" type="text" />
                <Input ref={usernameRef} label="Username" id="username" type="text" />
                <Input ref={emailRef} label="E-mail" id="email" type="email" />
                <Input ref={passwordRef} label="Password" id="password" type="password" />
                <Button title="submit" />
            </form>
        </Card>
    )
}

export default UpdateUserForm;
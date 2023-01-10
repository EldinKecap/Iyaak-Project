import { useContext } from "react";
import HeaderContext from "../../store/header-context";
import LoginContext from "../../store/login-context";
import Button from "../UI/Button/Button";
import classes from "./Header.module.css"

const Header = (props) => {
    const HeaderCtx = useContext(HeaderContext);
    const LoginCtx = useContext(LoginContext)
    console.log(HeaderCtx);

    function selectedView(str) {
        HeaderCtx.setSelected(str)
    }

    function logout() {
        LoginCtx.setLoggedIn(false);
    }

    return (
        <header className={classes.header}>
            <ul className={classes.list}>
                <li><Button title="Create user"
                    onClick={selectedView.bind(null, 'createUser')} />
                </li>

                <li><Button title="Get user"
                    onClick={selectedView.bind(null, 'getUser')} />
                </li>

                <li><Button title="Get all users"
                    onClick={selectedView.bind(null, 'getAllUsers')} />
                </li>

                <li><Button title="Update user"
                    onClick={selectedView.bind(null, 'updateUser')} />
                </li>

                <li><Button title="Delete user"
                    onClick={selectedView.bind(null, 'deleteUser')} />
                </li>

                <li>
                    <Button title="Log out" onClick={logout}/>
                </li>

            </ul>
        </header>
    )
}

export default Header;
import Card from '../UI/Card/Card';
import classes from './UserCard.module.css'
import UserDefaultImage from '../../assets/UserDefault.png'

const UserCard = (props) => {

    

    return (<Card>
        {
            <ul className={classes.list}>
                <img src={UserDefaultImage} alt="User Image" />
                <li>ID:{props.user._id}</li>
                <li>Username: {props.user.username}</li>
                <li>First name:{props.user.firstName}</li>
                <li>Last name:{props.user.lastName}</li>
                <li>E-mail:{props.user.email}</li>
            </ul>
        }
    </Card>)
}

export default UserCard;
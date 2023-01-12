import Card from '../UI/Card/Card';
import classes from './UserCard.module.css'

const UserCard = (props) => {



    return (<Card className={classes.cardStyle}>
        {
            <div className={classes.profile}>
                <div className={classes.imageContainer}>
                    <img src="https://cdn-icons-png.flaticon.com/512/2102/2102633.png" alt="User" />
                    <p>{props.user.username}</p>
                </div>
                <div className={classes.infoContainer}>
                    <p className={classes.name}>First name</p> <p className={classes.name}>{props.user.firstName}</p>
                    <p className={classes.name}>Last name</p> <p className={classes.name}>{props.user.lastName}</p>
                </div>
                <hr />
                <div className={`${classes.infoContainer} ${classes.infoContainerSmall}`}>
                    <p>ID</p> <p>{props.user._id}</p>
                    <p>E-mail</p> <p className={classes.email}>{props.user.email}</p>
                </div>
            </div>
        }
    </Card>)
}

export default UserCard;
import { Link } from "react-router-dom"

const User = ({user}) => {
    return (
        <div className="user-container">
            <Link className="user-link" to={`/user/${user._id}`}>
                <div className="user-top">
                    <h3>{`${user.username.toUpperCase()}  (${user.ratingCount})`}</h3>
                    <img src={`data:image/jpeg;base64,${user.image}`} alt="profile-pic"/>
                </div>
                <p><strong>Appearance: {user.appearance}</strong></p>
                <p><strong>Personality: {user.personality}</strong></p>
            </Link>
        </div>
    )
}

export default User
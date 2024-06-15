import { Link } from "react-router-dom"

const User = ({user}) => {
    return (
        <div className="user-container">
            <Link className="user-link" to={`/user/${user._id}`}>
                <h3>{user.username}</h3>
                <p><strong>Appearance: {user.appearance}</strong></p>
                <p><strong>Personality: {user.personality}</strong></p>
            </Link>
        </div>
    )
}

export default User
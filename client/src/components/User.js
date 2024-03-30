const User = ({user}) => {
    return (
        <div className="user-container">
            <h3>{user.username}</h3>
            <p><strong>Appearance: {user.overallRatings.appearance}</strong></p>
            <p><strong>Personality: {user.overallRatings.personality}</strong></p>
        </div>
    )
}

export default User
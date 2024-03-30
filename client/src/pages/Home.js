import { useEffect, useState } from "react"
import User from "../components/User"

const Home = () => {
    const [users, setUsers] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/users/home')
            const json = await response.json()

            if (response.ok) {
                setUsers(json)
            } else{
                console.log("Error")
            }
        }

        fetchUsers()
    }, [])
    
    return (
        <div className="home">
            <div className="users">
                {users && users.map((user) => (
                    <User key={user._id} user={user}></User>
                ))}
            </div>
        </div>
    )
}

export default Home
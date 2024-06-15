import { useEffect, useState } from "react"
import User from "../components/User"
import { Navigate } from "react-router-dom"
import Navbar from "../components/Navbar"

const Home = () => {
    const [users, setUsers] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/users/home')
            const json = await response.json()
            console.log(json)
            if (response.ok) {
                setUsers(json)
                setError(null)
            } else{
                if (json.error === 'Unverified' || json.error === 'No token'){
                    console.log('NOT LOGGED IN!')
                    setError(json)
                }    
            }
        }

        fetchUsers()
    }, [])

    if (error) {
        return <Navigate to='/' />
    }

    return (
        <div className="home">
            <Navbar logged= {true} />
            <div className="users">
                {users && users.map((user) => (
                    <User key={user._id} user={user}></User>
                ))}
            </div>
        </div>
    )
}

export default Home
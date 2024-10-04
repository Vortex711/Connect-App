import { useParams } from "react-router-dom"
import RateForm from "../components/RateForm"
import { useEffect, useState } from "react"

const RateUser =  () => {
    const { userId } = useParams()
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/users/${userId}`)
            const userDetails = await response.json()
            if (response.ok)  {
                setUser(userDetails)
                setLoading(false)
            } else {
                setUser({})
                setLoading(true)
            }
        }
        
        fetchUser()
    }, [userId])

    if (loading) return <div className="loading-container"><div className="loading"><center>Loading...</center></div></div>;

    return (
        <div className="form-page">
            <div className="form-container">
                <RateForm user={user}/>
            </div>
        </div>
    )
}

export default RateUser

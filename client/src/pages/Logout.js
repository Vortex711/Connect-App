import { useEffect } from "react"
import { Navigate } from "react-router-dom"

const Logout = () => {
    useEffect(() => {
        const logout = async () => {
            await fetch(`${process.env.REACT_APP_SERVER_URI}/api/users/logout`)
            localStorage.removeItem('jwt')
        }
        logout()
    }, [])
    
    return <Navigate to="/" />
}

export default Logout
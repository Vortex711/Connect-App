    import { jwtDecode } from 'jwt-decode';

    export const getUserFromToken = () => {
        console.log("Getting user from jwt")
        const token = localStorage.getItem('jwt'); // Adjust this based on how you store your token
        if (!token) return null;

        try {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken)

            const currentTime = Date.now() / 1000; // Current time in seconds
            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('token');
                return null;
            }

            return decodedToken;
        } catch (error) {
            console.error('Invalid token', error);
            localStorage.removeItem('token');
            return null;
        }
    };

    export default getUserFromToken

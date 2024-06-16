import { useState } from "react"
import { Link } from "react-router-dom"

const RateForm = ( { user } ) => {

    const [appearance, setAppearance] = useState(2.5)
    const [personality, setPersonality] = useState(2.5)
    const [content, setContent] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = {appearance, personality, content}
        console.log(body)
        try {
            const response = await fetch(`/api/ratings/rate/${user._id}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify(body),
                    headers: {'Content-Type': 'application/json'}
                }
            )
            
            const json = await response.json()
            console.log(json)
            if (response.ok) {
                setSubmitted(true)
            } else {
                setSubmitted(false)
            }

        } catch (err) {
            console.log(err)
            setSubmitted(false)
        }
    }
    
    if (submitted) 
    return (
        <>
            <h2>SUBMITTED</h2>
            <Link to="/home">
                <button>OK</button>
            </Link>
        </>
    )

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2 className="form-heading">Review on {user.name}</h2>
                
                <label>Appearance</label>
                <select id="appearance" value={appearance} onChange={(e) => setAppearance(e.target.value)}>
                    <option value={0.5}>0.5</option>
                    <option value={1.0}>1.0</option>
                    <option value={1.5}>1.5</option>
                    <option value={2.0}>2.0</option>
                    <option value={2.5}>2.5</option>
                    <option value={3.0}>3.0</option>
                    <option value={3.5}>3.5</option>
                    <option value={4.0}>4.0</option>
                    <option value={4.5}>4.5</option>
                    <option value={5.0}>5.0</option>
                </select>

                <label>Personality</label>
                <select id="personality" value={personality} onChange={(e) => setPersonality(e.target.value)}>
                    <option value={0.5}>0.5</option>
                    <option value={1.0}>1.0</option>
                    <option value={1.5}>1.5</option>
                    <option value={2.0}>2.0</option>
                    <option value={2.5}>2.5</option>
                    <option value={3.0}>3.0</option>
                    <option value={3.5}>3.5</option>
                    <option value={4.0}>4.0</option>
                    <option value={4.5}>4.5</option>
                    <option value={5.0}>5.0</option>
                </select>
                
                <label>Content:</label>
                <textarea 
                    id="content" 
                    rows="7"
                    cols="35"
                    value={content}
                    onChange={(e) => {setContent(e.target.value)}}
                />
                <button type="submit">Submit Review</button>
            </form>
        </>
    )
}

export default RateForm
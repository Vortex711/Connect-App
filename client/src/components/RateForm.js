import { useState } from "react"
import { Link } from "react-router-dom"

const RateForm = ( { user } ) => {

    const [appearance, setAppearance] = useState(2.5)
    const [personality, setPersonality] = useState(2.5)
    const [content, setContent] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = {userId: user._id, appearance, personality, content}
        console.log(body)
        try {
            const response = await fetch(`/api/ratings/rate`,
                {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {'Content-Type': 'application/json'}
                }
            )
            
            const review = await response.json()
            console.log(review)
            const updateResponse = await fetch('/api/ratings/updateUser', {
                method: 'PATCH',
                body: JSON.stringify({review, remove: false}),
                headers: {'Content-Type': 'application/json'}
            })
            const json = updateResponse.json()
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
            <Link to={`/user/${user._id}`}>
                <button className="buttons">OK</button>
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
                <button className="buttons" type="submit">Submit Review</button>
            </form>
        </>
    )
}

export default RateForm
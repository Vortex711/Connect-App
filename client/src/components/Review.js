import { useEffect, useState } from "react"

const Review = ({rev}) => {
    const [review, setReview] = useState(rev)
    const [liked, setLiked] = useState(false)
    const [opacity, setOpacity] = useState(1)

    useEffect(() => {
        const checkLiked = async () => {
            try {
                const response = await fetch(`/api/likes/check/${review._id}`)
                const status = await response.json()
                console.log(status.liked)
                if (status.liked) {
                    setLiked(true)
                    setOpacity(0.6)
                } else {
                    setLiked(false)
                    setOpacity(1)
                }
            } catch(err) {
                console.log(err)
                setLiked(false)
                setOpacity(1)
            }
        }

        checkLiked()
    }, [liked, review])

    const handleLike = async () => {
        if (liked) {
            try {
                const removed = await fetch(`/api/likes/remove`, {
                    method: 'DELETE',
                    body: JSON.stringify({reviewId: review._id}),
                    headers: {'Content-Type': 'application/json'}
                })
                const json = await removed.json()
                console.log(json)
                const response = await fetch('/api/likes/update', {
                    method: 'PATCH',
                    body: JSON.stringify({reviewId: review._id, liked: liked}),
                    headers: {'Content-Type': 'application/json'}
                })
                const updatedReview = await response.json()
                setReview(updatedReview)
                setLiked(false)
                setOpacity(1)
            } catch (err) {
                console.log(err)
                setLiked(true)
                setOpacity(0.6)
            }
        } else {
            try{
                const added = await fetch(`/api/likes/add`, {
                    method: 'POST',
                    body: JSON.stringify({reviewId: review._id}),
                    headers: {'Content-Type': 'application/json'}
                })
                const json = await added.json()
                console.log(json)
                const response = await fetch('/api/likes/update', {
                    method: 'PATCH',
                    body: JSON.stringify({reviewId: review._id, liked: liked}),
                    headers: {'Content-Type': 'application/json'}
                })
                const updatedReview = await response.json()
                console.log(updatedReview)
                setReview(updatedReview)
                setLiked(true)
                setOpacity(0.6)
            } catch(err) {
                console.log(err)
                setLiked(false)
                setOpacity(1)
                setReview(rev)
            }
        }

        
    }

    return (
        <div className="review-container">
            <div>
                <h3>{review.reviewerUsername.toUpperCase()}</h3>
                <p><strong>Appearance: </strong>{review.appearance}</p>
                <p><strong>Personality: </strong>{review.personality}</p>
                {review.content && <p><strong className="content">Content: </strong>{review.content}</p>}
            </div>
            <div className="like-dislike-container">
                <div className="small-container">
                    <button className="like-dislike-button" onClick={handleLike} style={{opacity: opacity}}>
                        <img src="/icons/like.png" alt="like button"/>
                    </button>
                    <span className="like-dislike-number">{review.likes}</span>
                    
                </div>
                <div className="small-container">
                    <button className="like-dislike-button">
                        <img src="/icons/dislike.png" alt="dislike button"/>
                    </button>
                    <span className="like-dislike-number">{review.dislikes}</span>
                </div>
            </div>
        </div>
        
    )
}

export default Review
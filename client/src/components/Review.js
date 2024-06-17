const Review = ({review}) => {
    return (
        <div className="review-container">
            <h3>{review.reviewerUsername.toUpperCase()}</h3>
            <p><strong>Appearance: {review.appearance}</strong></p>
            <p><strong>Personality: {review.personality}</strong></p>
            {review.content && <p><strong>Content: {review.content}</strong></p>}
        </div>
    )
}

export default Review
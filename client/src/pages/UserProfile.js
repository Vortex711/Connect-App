import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import Navbar from '../components/Navbar';
import Review from '../components/Review';
import getUserFromToken from '../util/auth';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState(null)
  const [ratings, setRatings] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rated, setRated] = useState(false);
  const [currUser, setCurrUser] = useState(null)
  const [ratingsPageCount, setRatingsPageCount] = useState(1)
  const [ratingsCurrentPage, setRatingsCurrentPage] = useState(0)
  const [reviewsPageCount, setReviewsPageCount] = useState(1)
  const [reviewsCurrentPage, setReviewsCurrentPage] = useState(0)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/users/${userId}`, {
          method: 'GET',
          credentials: 'include',
      });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        } 
        const data = await response.json();
        setUser(data);
        const res = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/ratings/rating/${data.username}`, {
          method: 'GET',
          credentials: 'include',
      })
        const status = await res.json();
        const reviewsCountResponse = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/ratings/reviews/count/${data.username}`, {
          method: 'GET',
          credentials: 'include',
      })
        const reviewsCount = await reviewsCountResponse.json()
        setReviewsPageCount(reviewsCount)
        const reviewsResponse = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/ratings/reviews/${data.username}?p=${reviewsCurrentPage}`, {
          method: 'GET',
          credentials: 'include',
      })
        const reviewDetails = await reviewsResponse.json()
        const ratingsCountResponse = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/ratings/count/${data.username}`, {
          method: 'GET',
          credentials: 'include',
      })
        const ratingsCount = await ratingsCountResponse.json()
        setRatingsPageCount(ratingsCount)
        const ratingsResponse = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/ratings/${data.username}?p=${ratingsCurrentPage}`, {
          method: 'GET',
          credentials: 'include',
      })
        const ratingDetails = await ratingsResponse.json()
        const getUser = getUserFromToken()
        const userResponse = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/users/${getUser.id}`, {
          method: 'GET',
          credentials: 'include',
      })
        const currentUser = await userResponse.json()
        setCurrUser(currentUser)
        setReviews(reviewDetails)
        console.log(reviewDetails)
        setRatings(ratingDetails)
        console.log(ratingDetails)
        if (status.rated) {
            setRated(true)
        } else {
            setRated(false)
        }
        setLoading(false);
      } catch (err) {
        setCurrUser(false)
        setRated(false)
        setUser(null)
        setReviews(null)
        setRatings(null)
        setError(err);
        setLoading(false);
        setReviewsPageCount(1)
        setReviewsCurrentPage(0)
        setRatingsPageCount(1)
        setRatingsCurrentPage(0)
      }
    };

    fetchUser();
  }, [userId, ratingsCurrentPage, reviewsCurrentPage]);

  const handleRatingsPageClick = (e) => {
    setRatingsCurrentPage(e.selected)
  }

  const handleReviewsPageClick = (e) => {
    setReviewsCurrentPage(e.selected)
  }

  const refresh = () => {
    window.location.reload()
  }

  if (loading) return <div className="loading-container"><div className="loading"><center>Loading...</center></div></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
        <Navbar logged = {true} />
        <div className="profile-container">
          <div className="initial-profile-container">
            <div className="user-details-img-container">
              <div className="user-details-container">
                <h1>{`${user.username} (${user.ratingCount})`}</h1>
                <div className="user-details">
                  <div className="user-labels">
                    <p><strong>Name:</strong> </p>
                    <p><strong>Age:</strong></p> 
                    <p><strong>Gender:</strong></p> 
                    <p><strong>Appearance:</strong></p> 
                    <p><strong>Personality:</strong></p>   
                  </div>
                  <div className="user-values">
                    <p>{user.name}</p>
                    <p>{user.age}</p>
                    <p>{user.gender}</p>
                    <p>{user.appearance}</p>
                    <p>{user.personality}</p>
                  </div>
                </div>
                <div class="button-container">
                    {!rated && <Link to={`/rate/${user._id}`}><button className="buttons">Rate</button></Link>}
                    <Link to={"/home"}><button className="buttons">Back</button></Link>
                </div>
              </div>
              <div className="user-img-container">
                <img src={`data:image/jpeg;base64,${user.image}`} alt="user-img"/>
              </div>
            </div>
            <div className="ratings-container">
              {ratings.length === 0 && <h2>{"No ratings :("}</h2>}
              {ratings.length !== 0 && <h2>Given Reviews</h2>}
              <div className="ratings">
                {ratings && ratings.map((rating) => (
                  <Review key={rating.reviewedUsername} rev={rating} rating={true} username={currUser.username} refresh={refresh}/>
                ))}
              </div>
              <ReactPaginate
                className="paginate-container"
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handleRatingsPageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={ratingsPageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                activeClassName="active"
              />
            </div>
          </div>
          <div className="reviews-container">
            {reviews.length === 0 && <h2>{"No reviews :("}</h2>}
            {reviews.length !== 0 && <h2>Received Reviews</h2>}
            <div className="reviews">
              {reviews && reviews.map((review) => (
                <Review key={review.reviewerUsername} rev={review} rating={false} username={currUser.username} refresh={refresh}/>
              ))}
            </div>
            <ReactPaginate
                className="paginate-container"
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handleReviewsPageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={reviewsPageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                activeClassName="active"
              />
          </div>
        </div>
    </div>
  );
};

export default UserProfile;

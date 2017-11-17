import React, { Component } from 'react';
import ReviewCard from './ReviewCard';
import { createReview, listReviews } from './../../api/remote';

class ReviewList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comment: '',
            rating: 5,
            reviews: [],
            error: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const review = {
            rating: Number(this.state.rating),
            comment: this.state.comment
        };

        const error = { message: '', errors: {} };

        if (isNaN(review.rating) || review.rating <= 0) {
            error.message = "Check the form for errors";
            error.errors.rating = "Rating must be a positive number between 1 and 5";
        }
        if (review.comment === undefined || review.comment === '' || review.comment === null) {
            error.message = "Check the form for errors";
            error.errors.comment = "Comment cannot be empty";
        }

        if (error.message) {
            this.setState({ error });
        }

        const hotelId = this.props.hotelId;

        createReview(hotelId, review).then(() => {
            const reviews = this.state.reviews.slice();
            reviews.push(review);
            this.setState({ reviews, comment: ''});
            this.loadReviews();
            document.getElementById('comment').value = '';
        });
    }

    loadReviews() {
        const hotelId = this.props.hotelId;
        listReviews(hotelId).then((reviews) => this.setState({ reviews }));
    }

    componentDidMount() {
        this.loadReviews();
    }

    render() {
        let errors = null;
        if (this.state.error) {
            errors = (
                <div>
                    <h2 className="errorMessage">{this.state.error.message}</h2>
                    {Object.keys(this.state.error.errors).map(e => {
                        return <p key={e}>{this.state.error.errors[e]}</p>
                    })}
                </div>
            )
        }
        return (
            <div style={{ margin: '2em' }}>
                <form onSubmit={this.onSubmit}>
                    <h2>Make a review</h2>
                    {errors}
                    <div>
                        Rating:
                        <select name="rating" onChange={this.onChange} value={this.state.rating}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    Comment:<br />
                    <textarea
                        id="comment"
                        onChange={this.onChange}
                        name="comment"
                        value={this.state.comment}
                        style={{ resize: 'none', width: '90%', height: '100px' }} /> <br />
                    <input type="submit" value="Post review" />
                </form>
                {this.state.reviews.map((r, i) => (
                    <ReviewCard
                        key={i}
                        user={r.user}
                        comment={r.comment}
                        rating={r.rating}
                        date={r.createdOn}
                    />
                ))}
            </div>
        )
    }
}

export default ReviewList;
import React, { Component } from 'react';

class ReviewCard extends Component {
    render() {
        const { comment, rating, user, date } = this.props;
        const parsedDate = new Date(date).toDateString();
        
        return (
            <article>
                <header>{user} - {rating} stars</header>
                <p>{comment}</p>
                <footer style={{ fontStyle: 'italic' }}>posted on {parsedDate}</footer>
            </article>
        )
    }
}

export default ReviewCard;
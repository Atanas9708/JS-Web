import React, { Component } from 'react';
import reqHandler from './../../utils/reqHandler';

class CreateComment extends Component {
    constructor(props) {
        super(props);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        let data = {
            postId: this.props.id,
            content: this.state.content,
            author: localStorage.getItem('username')
        };
        reqHandler.createComment(data)
        .then(response => {
            console.log(response);
        })

    }

    render() {
        return (
            <div className="post post-content">
                <form id="commentForm" onSubmit={this.onSubmit}>
                    <label>Comment</label>
                    <textarea onChange={this.onChange} name="content" type="text"></textarea>
                    <input type="submit" value="Add Comment" id="btnPostComment" />
                </form>
            </div>
        )
    }
}

export default CreateComment;
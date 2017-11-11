import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import reqHandler from './../../utils/reqHandler';
import notifiy from './../../notifications/notify';

class CreateComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posted: false
        }

    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state === null) {
            notifiy.showError('The content of the comment cannot be empty!');
            return;
        }
        let data = {
            postId: this.props.id,
            content: this.state.content,
            author: localStorage.getItem('username')
        };
        reqHandler.createComment(data)
            .then(response => {
                notifiy.showInfo('Comment created!');
                this.setState({posted: true})
                window.location.replace(`/details/${this.props.id}`);
            })
    }

    render() {
        const { posted } = this.state;
        return (
            <div className="post post-content">
                <form id="commentForm" onSubmit={this.onSubmit}>
                    <label>Comment</label>
                    <textarea onChange={this.onChange} name="content" type="text"></textarea>
                    <input type="submit" value="Add Comment" id="btnPostComment" />
                </form>
                {posted && (
                    <Redirect exact to={`/details/${this.props.id}`} />
                )}
            </div>
        )
    }
}

export default CreateComment;
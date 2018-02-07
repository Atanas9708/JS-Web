import React, { Component } from 'react';
import reqHandler from './../../utils/reqHandler';
import { Link } from 'react-router-dom';
import notify from './../../notifications/notify';

class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: '',
            comments: [],
            post: {},
            time: ''
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        const postId = this.props.match.params.postId;
        reqHandler.loadPostById(postId)
            .then(post => {
                let time = reqHandler.calcTime(post._kmd.ect);
                this.setState({ post, time })
            })
            .then(() => {
                this.loadComments(postId);
            })
    }


    loadComments = (postId) => {
        reqHandler.loadCommentsById(postId)
            .then(comments => {
                this.setState({ comments });
            })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.comment === null) {
            notify.showError('The content of the comment cannot be empty!');
            return;
        }
        let data = {
            postId: this.props.match.params.postId,
            content: this.state.comment,
            author: localStorage.getItem('username')
        };
        reqHandler.createComment(data)
            .then(response => {
                notify.showInfo('Comment created!');
                let newComments = this.state.comments.slice();
                newComments.unshift(response);
                this.setState({ content: '', comments: newComments });
                document.getElementById('input').value = '';
            })
    }

    render() {
        return (
            <section id="viewComments">
                <div className="post">
                    <div className="col thumbnail">
                        <a href={this.state.post.url}>
                            <img src={this.state.post.imageUrl} />
                        </a>
                    </div>
                    <div className="post-content">
                        <div className="title">
                            <a href={this.state.post.url}>
                                {this.state.post.title}
                            </a>
                        </div>
                        <div className="details">
                            <p>{this.state.post.description}</p>
                            <div className="info">
                                submitted {this.state.time} ago by {this.state.post.author}
                            </div>
                            <div className="controls">
                                <ul>
                                    {this.state.post.author === localStorage.getItem('username') &&
                                        <div>
                                            <li className="action"><Link className="editLink" to={`/editPost/${this.state.post._id}`}>edit</Link></li>
                                            <li className="action"><Link className="deleteLink" to={`/deletePost/${this.state.post._id}`}>delete</Link></li>
                                        </div>
                                    }
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
                <div className="post post-content">
                    <form id="commentForm" onSubmit={this.onSubmit}>
                        <label>Comment</label>
                        <textarea onChange={this.onChange} id="input" name="comment" type="text"></textarea>
                        <input type="submit" value="Add Comment" id="btnPostComment" />
                    </form>
                </div>
                {this.state.comments.map((c, i) => {
                    return <article key={i} className="post post-content">
                        <p>{c.content}</p>
                        <div className="info">
                            submitted {reqHandler.calcTime(c._kmd.ect)} ago by {c.author} |
            {localStorage.getItem('username') === c.author ? <a onClick={() => {
                                reqHandler.deleteComment(c._id)
                                    .then(() => {
                                        let newComments = this.state.comments.filter(x => x._id !== c._id);
                                        this.setState({ comments: newComments });
                                        notify.showInfo('Comment deleted!');
                                    })
                            }} href="javascript:void(0)" className="deleteLink">Delete</a> : null}
                        </div>
                    </article>
                })}

            </section>
        )
    }
}

export default Details;
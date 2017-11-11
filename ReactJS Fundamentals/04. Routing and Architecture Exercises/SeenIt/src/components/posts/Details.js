import React, { Component } from 'react';
import reqHandler from './../../utils/reqHandler';
import { Link } from 'react-router-dom';

import Comment from './../comments/Comment';
import CreateComment from './../comments/CreateComment';

class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            post: {},
            time: ''
        }
    }

    loadComments = (postId) => {
        reqHandler.loadCommentsById(postId)
            .then(comments => {
                this.setState({ comments: comments });
            })
    }

    componentDidMount() {
        let postId = this.props.match.params.postId;
        reqHandler.loadPostById(postId)
            .then(post => {
                let time = reqHandler.calcTime(post._kmd.ect);
                this.setState({ post, time: time })
            })
            .then(() => {
                this.loadComments(postId);
            })
    }

    // componentWillReceiveProps(nextProps) {
    //     if(nextProps.comments.length !== this.state.comments.length) {
    //         this.setState({comments: nextProps.comments});
    //     }
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     const { comments } = this.state;
    //     console.log(prevProps);
    //     if (comments.length !== prevState.comments.length) {
    //         console.log('something happend');
    //     }
    // }

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
                <CreateComment id={this.props.match.params.postId} />
                {this.state.comments.map((c, i) => {
                    return <Comment key={i} data={c} />
                })}
            </section>
        )
    }
}

export default Details;
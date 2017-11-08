import React, { Component } from 'react';
import reqHandler from './../../utils/reqHandler';
import { Link } from 'react-router-dom';

import Comment from './../comments/Comment';
import CreateComment from './../comments/CreateComment';
import Controls from './../common/Controls';

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
            this.setState({comments: comments});
        })
    }

    componentDidMount() {
        let postId = this.props.match.params.postId;
        reqHandler.loadPostById(postId)
            .then(response => {
                let time = reqHandler.calcTime(response._kmd.ect);
                this.setState({ post: response, time: time })
            })
            .then(() => {
                this.loadComments(postId);
            })
    }

    render() {
        return (
            <section id="viewComments">
                <div className="post">
                    <div className="col thumbnail">
                        <Link to="http://sammyjs.org/docs/api/0.7.4/all#Sammy.RenderContext-load">
                            <img src={this.state.post.imageUrl} />
                        </Link>
                    </div>
                    <div className="post-content">
                        <div className="title">
                            <Link to="http://sammyjs.org/docs/api/0.7.4/all#Sammy.RenderContext-load">
                                {this.state.post.title}
                            </Link>
                        </div>
                        <div className="details">
                            <p>{this.state.post.description}</p>
                            <div className="info">
                                submitted {this.state.time} ago by {this.state.post.author}
                            </div>
                            <div className="controls">
                                <ul>
                                    {this.state.post.author === localStorage.getItem('username') ? <Controls id={this.props.match.params.postId} /> : null}
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
                <CreateComment id={this.props.match.params.postId} />
                {this.state.comments.map((c, i) => {
                    return <Comment key={i} data={c}/>
                })}
            </section>
        )
    }
}

export default Details;
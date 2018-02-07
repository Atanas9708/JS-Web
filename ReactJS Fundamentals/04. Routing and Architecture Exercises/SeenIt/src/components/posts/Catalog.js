import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import reqHandler from './../../utils/reqHandler';
import notify from './../../notifications/notify';

class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    loadPosts = () => {
        reqHandler.listAllPosts()
            .then(response => {
                this.setState({ posts: response });
            })
    }

    componentDidMount() {
        this.loadPosts();
    }

    render() {
        let rank = 1;
        return (
            <div className="posts">
                {this.state.posts.map((p, i) => {
                    return <article key={i} className="post">
                        <div className="col rank">
                            <span>{rank++}</span>
                        </div>
                        <div className="col thumbnail">
                            <a href={p.url}>
                                <img src={p.imageUrl} />
                            </a>
                        </div>
                        <div className="post-content">
                            <div className="title">
                                <a href={p.url}>
                                    {p.title}
                                </a>
                            </div>
                            <div className="details">
                                <div className="info">
                                    submitted {reqHandler.calcTime(p._kmd.ect)} ago by {p.author}
                                </div>
                                <div className="controls">
                                    <ul>
                                        {p.author === localStorage.getItem('username') &&
                                            <div>
                                                <li className="action"><Link className="commentsLink" to={`/details/${p._id}`}>details</Link></li>
                                                <li className="action"><Link className="editLink" to={`/editPost/${p._id}`}>edit</Link></li>
                                                <li className="action"><a onClick={() => {
                                                    reqHandler.deletePost(p._id)
                                                        .then(() => {
                                                            let newPosts = this.state.posts.filter(x => x._id !== p._id);
                                                            this.setState({ posts: newPosts });
                                                            notify.showError('Post deleted!');
                                                        });
                                                }} className="deleteLink" href="javascript:void(0)">delete</a></li>
                                            </div>
                                        }
                                        {p.author !== localStorage.getItem('username') &&
                                            <li className="action"><Link className="commentsLink" to={`/details/${p._id}`}>details</Link></li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </article>
                })}
            </div>
        )
    }
}

export default Catalog;
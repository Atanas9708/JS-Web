import React from 'react';
import reqHandler from './../../utils/reqHandler';
import { Link } from 'react-router-dom';

let Post = (props) => {
    return (
        <article className="post">
            <div className="col rank">
                <span>{props.rank}</span>
            </div>
            <div className="col thumbnail">
                <Link to={props.data.url}>
                    <img src={props.data.imageUrl} />
                </Link>
            </div>
            <div className="post-content">
                <div className="title">
                    <Link to={props.data.url}>
                        {props.data.title}
                    </Link>
                </div>
                <div className="details">
                    <div className="info">
                        submitted {reqHandler.calcTime(props.data._kmd.ect)} ago by {props.data.author}
                    </div>
                    <div className="controls">
                        <ul>
                            {props.data.author === localStorage.getItem('username') &&
                                <div>
                                    <li className="action"><Link className="commentsLink" to={`/details/${props.data._id}`}>details</Link></li>
                                    <li className="action"><Link className="editLink" to={`/editPost/${props.data._id}`}>edit</Link></li>
                                    <li className="action"><Link className="deleteLink" to={`/deletePost/${props.data._id}`}>delete</Link></li>
                                </div>
                            }
                            {props.data.author !== localStorage.getItem('username') && 
                            <li className="action"><Link className="commentsLink" to={`/details/${props.data._id}`}>details</Link></li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default Post;
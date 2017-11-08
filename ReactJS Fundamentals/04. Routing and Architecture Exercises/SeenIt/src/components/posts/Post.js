import React from 'react';
import reqHandler from './../../utils/reqHandler';
import { Link } from 'react-router-dom';
import Controls from './../common/Controls';

let Post = (props) => {
    return (
        <article className="post">
        <div className="col rank">
            <span>{props.rank}</span>
        </div>
        <div className="col thumbnail">
            <Link to={props.data.url}>
                <img src={props.data.imageUrl}/>
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
                        <li className="action"><Link className="commentsLink" to={`/details/${props.data._id}`}>details</Link></li>
                        {props.data.author === localStorage.getItem('username') ? <Controls id={props.data._id} /> : null}
                    </ul>
                </div>
            </div>
        </div>
    </article>
    )
}

export default Post;
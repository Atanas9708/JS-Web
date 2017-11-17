import React from 'react';
import reqHandler from './../../utils/reqHandler';
import DeleteComment from './../comments/DeleteComment';

let Comment = (props) => {
    return (
        <article className="post post-content">
        <p>{props.data.content}</p>
        <div className="info">
            submitted {reqHandler.calcTime(props.data._kmd.ect)} ago by {props.data.author} | 
            {localStorage.getItem('username') === props.data.author ?<DeleteComment id={props.data._id}/> : null}
        </div>
    </article>
    )
}

export default Comment;
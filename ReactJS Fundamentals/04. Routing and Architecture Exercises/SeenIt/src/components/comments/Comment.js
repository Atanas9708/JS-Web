import React from 'react';
import reqHandler from './../../utils/reqHandler';
import DeleteCommentGet from './../comments/DeleteCommentGet';

let Comment = (props) => (
    <article className="post post-content">
        <p>{props.data.content}</p>
        <div className="info">
            submitted {reqHandler.calcTime(props.data._kmd.ect)} ago by {props.data.author} | 
            {localStorage.getItem('username') === props.data.author ?<DeleteCommentGet id={props.data._id}/> : null}
        </div>
    </article>
)

export default Comment;
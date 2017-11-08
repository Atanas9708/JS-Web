import React from 'react';
import { Redirect } from 'react-router-dom';
import reqHandler from './../../utils/reqHandler';

let DeleteCommentPost = (props) => {
    let commentId = props.match.params.commentId;
    console.log(commentId);
    reqHandler.deleteComment(commentId);

    return (
        <Redirect  to='/catalog'/>
    )
}

export default DeleteCommentPost;
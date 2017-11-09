import React from 'react';
import { Redirect } from 'react-router-dom';
import reqHandler from './../../utils/reqHandler';
import notifiy from './../../notifications/notify';

let DeleteCommentPost = (props) => {
    let commentId = props.match.params.commentId;
    reqHandler.deleteComment(commentId)
    .then(() => {
        notifiy.showInfo('Comment deleted!');
    })

    return (
        <Redirect  to={window.history.go(-1)}/>
    )
}

export default DeleteCommentPost;
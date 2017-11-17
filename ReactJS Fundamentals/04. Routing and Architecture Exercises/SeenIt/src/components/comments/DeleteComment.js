import React from 'react';
import reqHandler from './../../utils/reqHandler';
import notifiy from './../../notifications/notify';

let DeleteCommentGet = (props) => {
    return (
        <a onClick={() => {
            let commentId = props.id;
            reqHandler.deleteComment(commentId)
            .then(() => {
                notifiy.showInfo('Comment deleted!');
            })
        }} href="javascript:void(0)" className="deleteLink"> delete</a>
    )
}

export default DeleteCommentGet;
import React, { Component } from 'react';
import Post from './Post';
import reqHandler from './../../utils/reqHandler';

class MyPosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    loadMyPosts = () => {
        reqHandler.myPosts()
            .then(response => {
                this.setState({ posts: response });
            })
    }

    componentDidMount() {
        this.loadMyPosts();
    }


    render() {
        let rank = 1;
        return (
            <div className="posts">
                {this.state.posts.map((p, i) => {
                    return <Post key={i} data={p} rank={rank++} />
                })}
            </div>
        )
    }
}

export default MyPosts;
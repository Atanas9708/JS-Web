import React, { Component } from 'react';
import Post from './Post';
import reqHandler from './../../utils/reqHandler';

class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rank: 1,
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
        return (
            <div className="posts">
                {this.state.posts.map((p, i) => {
                    return <Post key={i} data={p} rank={this.state.rank++} />
                })}
            </div>
        )
    }
}

export default Catalog;
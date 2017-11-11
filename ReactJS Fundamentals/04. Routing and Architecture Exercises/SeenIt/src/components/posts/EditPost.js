import React, { Component } from 'react';
import Post from './Post';
import { Redirect } from 'react-router-dom';
import reqHandler from './../../utils/reqHandler';
import notifiy from './../../notifications/notify';

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            title: '',
            image: '',
            description: '',
            fireRedirect: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.url === '' || this.state.title === '' || this.state.image === '') {
            notifiy.showError('Please fill all the required fields');
            return;
        }
        let payload = {
            author: localStorage.getItem('username'),
            title: this.state.title,
            description: this.state.description,
            url: this.state.url,
            imageUrl: this.state.image
        };
        let postId = this.props.match.params.postId;
        reqHandler.editPost(payload, postId)
            .then(response => {
                this.setState({ fireRedirect: true })
                notifiy.showInfo(`Post ${this.state.title} edited!`);
                //window.location.replace('/catalog');
            })
    }

    componentDidMount() {
        let postId = this.props.match.params.postId;
        reqHandler.loadPostById(postId)
            .then(post => {
                this.setState({ url: post.url, image: post.imageUrl, title: post.title, description: post.description });
            })
    }

    render() {
        const { fireRedirect } = this.state;
        return (
            <div>
                <section id="viewEdit">
                    <div className="submitArea">
                        <h1>Edit Link</h1>
                        <p>Please, fill out the form. A thumbnail image/description is not required.</p>
                    </div>
                    <div className="submitArea formContainer">
                        <form id="editPostForm" className="submitForm" onSubmit={this.onSubmit}>
                            <label>Link URL:</label>
                            <input onChange={this.onChange} name="url" type="text" value={this.state.url} />
                            <label>Link Title:</label>
                            <input onChange={this.onChange} name="title" type="text" value={this.state.title} />
                            <label>Link Thumbnail Image (optional):</label>
                            <input onChange={this.onChange} name="image" type="text" value={this.state.image} />
                            <label>Description (optional):</label>
                            <textarea onChange={this.onChange} name="description" value={this.state.description}></textarea>
                            <input id="btnEditPost" type="submit" value="Edit Post" />
                        </form>
                    </div>
                </section>
                {fireRedirect && (
                    <Redirect to='/'/>
                )}
            </div>
        )
    }
}

export default EditPost;
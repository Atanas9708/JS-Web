import React, { Component } from 'react';
import Image from './Image';
import observer from './../utils/observer';

class Bio extends Component {
    constructor() {
        super()

        this.state = {
            id: 0,
            currentChar: {}
        };
    }

    componentDidMount() {
        observer.addObserver('changeFocus', this.viewBio);
    }

    viewBio = ({ id }) => {
        this.setState({ id: id });
        this.getImg({ id });
    }

    getImg = ({ id }) => {
        fetch('http://localhost:9999/character/' + id).then(data => {
          return data.json();
        }).then(parsedData => {
            this.setState({ currentChar: parsedData });
        })
    }

    render() {
        let html;
        if (Object.keys(this.state.currentChar).length !== 0) {
            html = (
                <fieldset>
                    {Image({ url: this.state.currentChar.url })};
                    <div>
                        {this.state.currentChar.bio}
                    </div>
                </fieldset>
            )
        }
        return (
            <div>
                {html}
            </div>
        )
    }
}


export default Bio;
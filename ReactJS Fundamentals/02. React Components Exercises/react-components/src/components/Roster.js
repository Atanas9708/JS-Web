import React, { Component } from 'react';
import Image from './Image';
import Bio from './Bio';
import observer from './../utils/observer';

class Roster extends Component {
    constructor() {
        super()

        this.state = {
            imgArr: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:9999/roster').then(data => {
            return data.json();
        }).then(parsedData => {
            this.setState({ imgArr: parsedData })
        })
    }


    render() {
        return (
            <div>
                {this.state.imgArr.map((img, index) => {
                    return <span onClick={() => {
                        observer.executeObserver('changeFocus', { id: img.id });
                    }} key={index}> {Image({ url: img.url })} </span>
                })}
                <Bio />
            </div>
        )
    }
}

export default Roster;
import React, { Component } from 'react';
import left from './../resources/left.png';
import right from './../resources/right.png';

class Slider extends Component {
    constructor() {
        super()

        this.state = {
            focusedEpId: 0,
            imageUrl: ''
        }
    }

    getNewEp = (id) => {
        fetch('http://localhost:9999/episodePreview/' + id).then(data => {
            return data.json();
        }).then(parsedData => {
            let obj = {
                imageUrl: parsedData.url,
                focusedEpId: parsedData.id
            };
            this.setState(obj);
        })
    }

    componentDidMount() {
        fetch('http://localhost:9999/episodePreview/' + this.state.focusedEpId).then(data => {
            return data.json();
        }).then(parsedData => {
            this.setState({imageUrl: parsedData.url});
        })
    }

    render() {
        return (
            <div className='warper'>
                <img onClick={() => this.getNewEp(Number(this.state.focusedEpId - 1))} className='case-left' alt='leftArrow' src={left} />
                <img className='sliderImg' alt='focusedEp' src={this.state.imageUrl} />
                <img onClick={() => this.getNewEp(Number(this.state.focusedEpId + 1))} className='case-right' alt='rightArrow' src={right} />
            </div>
        )
    }
}

export default Slider;
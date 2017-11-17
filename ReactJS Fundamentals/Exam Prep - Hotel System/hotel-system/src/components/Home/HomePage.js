import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HotelList from './HotelList';
import { getPage } from './../../api/remote';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotels: []
        }
    }

    componentDidMount() {
        this.getHotels();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.page !== this.props.match.params.page) {
            this.getHotels(Number(nextProps.match.params.page));
        }
    }

    getHotels(page = Number(this.props.match.params.page) || 1) {
        getPage(page)
            .then(data => {
                this.setState({ hotels: data });
            })
    }

    render() {
        const page = Number(this.props.match.params.page) || 1;
        return (
            <div className="container">
                <h1>Home Page</h1>
                <p>Welcome to our site.</p>
                {this.state.hotels.length === 0 ?
                    <p>Loading &hellip;</p> :
                    <HotelList hotels={this.state.hotels} />}

                <div className="pagination">
                    {page > 1 && <Link to={`/view/${page - 1}`}>&lt;</Link>}
                    <Link to={`/view/${page + 1}`}>&gt;</Link>
                </div>
            </div>
        );
    }

}

export default HomePage;
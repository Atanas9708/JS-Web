import React, { Component } from 'react';
import { getHotelById } from './../../api/remote';
import ReviewList from './ReviewList';

class DetailsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotel: false
        }
    }

    componentDidMount() {
        this.loadHotel();
    }

    loadHotel() {
        const hotelId = Number(this.props.match.params.id);
        getHotelById(hotelId)
            .then((hotel) => {
                this.setState({ hotel });
            })
    }

    render() {
        let main = null;
        if (this.state.hotel.message === undefined) {
            const { hotel } = this.state;
            main = (
                <div className="container">
                    <h1>Details Page</h1>
                    <div className="hotelDetails">
                        <div>
                            <img alt={hotel.image} src={hotel.image} />
                        </div>
                        <h2>Hotel Name: {hotel.name}</h2>
                        <h3>Location: {hotel.location}</h3>
                        <p>Description: {hotel.description}</p>
                        <p>Number of Rooms: {hotel.numberOfRooms}</p>
                        <p>Parking Slots: {hotel.parkingSlots}</p>
                    </div>
                    <ReviewList hotelId={Number(this.props.match.params.id)} />
                </div>
            )
        } else {
            main = (
                <h1>404 Hotel Not Found</h1>
            )
        }

        return (
            main
        )
    }
}

export default DetailsPage;
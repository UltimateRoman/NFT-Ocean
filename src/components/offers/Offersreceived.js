import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../App.css';


class Offersreceived extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }

    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }

    render() {
        let filteredOffers = this.props.receivedOffers.filter((offer) => {
            return offer.tId.toString().indexOf(this.state.search) !== -1;
        });

        return (
            
            <div className="container-fluid mt-5" style={{ textAlign: 'center' }}>
                <div className="row">
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ margin: '0% 15%' }}>
                        <h1 style={{ color: "DodgerBlue" }}>Offers you have received</h1>
                        <br/><br/>

                        {this.props.filteredOffers.map((offer) => {
                            return (
                                <div>
                                    <Card>
                                        <Card.Header>Offer received for NFT {offer.tId.toString()}</Card.Header>
                                        <Card.Body>
                                            <Card.Title>Offered Amount: {window.web3.utils.fromWei(offer.offerAmount.toString(), 'Ether')} MATIC | $ {(parseFloat(window.web3.utils.fromWei(offer.offerAmount.toString(), 'Ether'))*parseFloat(this.props.latestPrice.toString())).toString()}</Card.Title>
                                            <Card.Text>
                                                Bidder: {offer.bidder}
                                            </Card.Text>

                                            { offer.isApproved 
                                                ?   <h4>You have approved this offer</h4>
                                                :   <Button
                                                        variant="success"
                                                        name={offer.id}
                                                        onClick={(event) => {
                                                            this.props.approveOffer(event.target.name)
                                                        }}
                                                    >
                                                        Approve this Offer
                                                    </Button>                                            
                                            }
                                        </Card.Body>
                                    </Card>
                                    <br/>
                                </div>
                            )
                        })}
                    </main>
                </div>
            </div>
        );
    }
}

export default Offersreceived;
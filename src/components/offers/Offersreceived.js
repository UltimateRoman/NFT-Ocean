import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../App.css';

class Offersreceived extends Component {

    render() {
        return (
            <div className="container-fluid mt-5" style={{ textAlign: 'center' }}>
                <div className="row">
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ margin: '0% 15%' }}>
                        <h1>Offers you have received</h1>
                        {this.props.receivedOffers.map((offer, key) => {
                            return (
                                <Card>
                                    <Card.Header>Offer for NFT {offer.tId.toString()}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>Offered Amount: {window.web3.utils.fromWei(offer.offerAmount.toString(), 'Ether')} MATIC</Card.Title>
                                        <Card.Text>
                                            Bidder: {offer.bidder}
                                        </Card.Text>
                                        { offer.isApproved 
                                            ?   <h4>You have approved this offer</h4>
                                            :   <Button
                                                    variant="primary"
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
                            )
                        })}
                    </main>
                </div>
            </div>
        );
    }
}

export default Offersreceived;
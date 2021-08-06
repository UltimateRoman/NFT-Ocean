import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../App.css';

class Offersplaced extends Component {

    render() {
        return (
            <div className="container-fluid mt-5" style={{ textAlign: 'center' }}>
                <div className="row">
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ margin: '0% 15%' }}>
                        <h1>Offers you have placed</h1>
                        {this.props.placedOffers.map((offer, key) => {
                            return (
                                <Card>
                                    <Card.Header>Bid for NFT {offer.tId.toString()}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>Bid Amount: {window.web3.utils.fromWei(offer.offerAmount.toString(), 'Ether')} MATIC | $ {(parseInt(window.web3.utils.fromWei(offer.offerAmount.toString(), 'Ether'))*parseInt(this.props.latestPrice.toString())).toString()}</Card.Title>
                                        <Card.Text>
                                            Auctioneer: {offer.auctioneer}
                                        </Card.Text>
                                        { offer.isApproved 
                                            ?   <Button
                                                    variant="primary"
                                                    name={offer.tId}
                                                    onClick={(event) => {
                                                        this.props.purchaseItem(event.target.name, window.web3.utils.fromWei(offer.offerAmount.toString(), 'Ether'))
                                                    }}
                                                >
                                                    Purchase NFT
                                                </Button>
                                            : <h4>This offer has not yet been approved</h4>
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

export default Offersplaced;
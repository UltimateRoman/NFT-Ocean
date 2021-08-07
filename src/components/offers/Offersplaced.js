import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../App.css';


class Offersplaced extends Component {

    render() {
        return (
            <div className="container-fluid mt-5" style={{ textAlign: 'center' }}>
                <div className="row">
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ margin: '0% 15%' }}>
                        <h1 style={{ color: "DodgerBlue" }}>Offers you have placed</h1>
                        <br/><br/>

                        {this.props.placedOffers.map((offer, key) => {
                            return (
                                <Card>
                                    <Card.Header>Bid for NFT {offer.tId.toString()}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>Bid Amount: {window.web3.utils.fromWei(offer.offerAmount.toString(), 'Ether')} MATIC | $ {(Math.round(parseFloat(window.web3.utils.fromWei(offer.offerAmount.toString(), 'Ether'))*parseFloat(this.props.latestPrice.toString())*10000)/10000).toString()}</Card.Title>
                                        <Card.Text>
                                            Auctioneer: {offer.auctioneer}
                                        </Card.Text>

                                        { offer.isApproved 
                                            ?   <div>
                                                    <h4>Your offer was approved</h4>
                                                    <Button
                                                        variant="info"
                                                        name={offer.tId}
                                                        onClick={(event) => {
                                                            this.props.purchaseItem(event.target.name, window.web3.utils.fromWei(offer.offerAmount.toString(), 'Ether'))
                                                        }}
                                                    >
                                                        Purchase NFT
                                                    </Button>
                                                </div>
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
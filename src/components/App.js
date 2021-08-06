import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TrinityRingsSpinner } from 'react-epic-spinners';
import Nfto from '../abis/Nfto.json';
import './App.css';
import Web3 from 'web3';

import Home from './Home';
import Header from './Header'
import Main from './Main';
import Yournfts from './Yournfts';
import English from './auctions/English';
import Dutch from './auctions/Dutch';
import Vickery from './auctions/Vickery';

import Offersplaced from './offers/Offersplaced';
import Offersreceived from './offers/Offersreceived';


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
   // await this.fetchLatestPrice()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      this.setState({ isConnected: true })
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      this.setState({ isConnected: true })
    }
    else {
      window.alert('Browser not supported. Use the MetaMask extension!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = Nfto.networks[networkId]

    if(networkData) {
      const nfto = new web3.eth.Contract(Nfto.abi, networkData.address)
      this.setState({ nfto })

      const tokenId = await nfto.methods.tokenId().call()

      for (var i = 1; i <= tokenId; i++) {
        const item = await nfto.methods.items(i).call()
        if (item.owner === this.state.account) {
          this.setState({
            myItems: [...this.state.myItems, item]
          })
        }
      }

      const eCount = await nfto.methods.eCount().call()
      const dCount = await nfto.methods.dCount().call()
      const vCount = await nfto.methods.vCount().call()

      for (i = 1; i <= eCount; i++) {
        const item = await nfto.methods.english(i).call()
        this.setState({
          englishItems: [...this.state.englishItems, item]
        })
      }

      for (i = 1; i <= dCount; i++) {
        const item = await nfto.methods.dutch(i).call()
        this.setState({
          dutchItems: [...this.state.dutchItems, item]
        })
      }

      for (i = 1; i <= vCount; i++) {
        const item = await nfto.methods.vickery(i).call()
        this.setState({
          vickeryItems: [...this.state.vickeryItems, item]
        })
      }

      const offerCount = await nfto.methods.offerCount().call()

      for (i = 1; i <= offerCount; i++) {
        const offer = await nfto.methods.offers(i).call()
        if (offer.auctioneer === this.state.account) {
          this.setState({
            receivedOffers: [...this.state.receivedOffers, offer]
          })
        }
        else if (offer.bidder === this.state.account) {
          this.setState({
            placedOffers: [...this.state.placedOffers, offer]
          })
        }
      }

      this.setState({ loading: false})
    } else {
      window.alert('The forum contract could not be deployed to the network')
    }
  }

  async fetchLatestPrice() {
    const web3 = window.web3
    const aggregatorV3InterfaceABI = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
    const addr = "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada";
    const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);
    priceFeed.methods.latestRoundData().call()
    .then((roundData) => {
      this.setState({ latestPrice: roundData[1]/100000000 })
    });
  }
  
  mintItem(price, name, description, cid) {
    this.setState({ loading: true })
    this.state.nfto.methods.mintItem(window.web3.utils.toWei(price.toString(), 'ether'), name, description, cid).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.href = '/'
    })
  }

  listItem(id, type, price) {
    this.setState({ loading: true })
    this.state.nfto.methods.listItem(id, type, window.web3.utils.toWei(price.toString(), 'ether')).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.href = '/'
    })
  }

  makeOffer(id, amount, type) {
    this.setState({ loading: true })
    this.state.nfto.methods.makeOffer(id, window.web3.utils.toWei(amount.toString(), 'ether'), type).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.href = '/'
    })
  }

  approveOffer(id) {
    this.setState({ loading: true })
    this.state.nfto.methods.approveOffer(id).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.href = '/'
    })
  }

  purchaseItem(tId, amount) {
    this.setState({ loading: true })
    this.state.nfto.methods.purchaseItem(tId).send({ from: this.state.account, value: window.web3.utils.toWei(amount.toString(), 'ether') })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.href = '/'
    })
  }
  

  constructor(props){
    super(props)
    this.state = {
      isConnected: false,
      loading: true,
      nfto: null,
      latestPrice: 1,
      englishItems: [],
      dutchItems: [],
      vickeryItems: [],
      myItems: [],
      receivedOffers: [],
      placedOffers: []
    }

    this.mintItem = this.mintItem.bind(this)
    this.listItem = this.listItem.bind(this)
    this.makeOffer = this.makeOffer.bind(this)
    this.approveOffer = this.approveOffer.bind(this)
    this.purchaseItem = this.purchaseItem.bind(this)
  }

  render() {
    if(this.state.isConnected) {
      return (
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/mint" render={props => (
                <React.Fragment>
                  {
                    this.state.loading
                      ? <div class="center"><TrinityRingsSpinner size="100" color="darkblue" /></div>
                      : <Main mintItem={this.mintItem}/>
                  }
                </React.Fragment>)} 
            />
            <Route exact path="/yournfts" render={props => (
                <React.Fragment>
                  {
                    this.state.loading
                      ? <div class="center"><TrinityRingsSpinner size="100" color="darkblue" /></div>
                      : <Yournfts myItems={this.state.myItems} listItem={this.listItem}/>
                  }
                </React.Fragment>)} 
            />
            <Route exact path="/english" render={props => (
                <React.Fragment>
                  {
                    this.state.loading
                      ? <div class="center"><TrinityRingsSpinner size="100" color="darkblue" /></div>
                      : <English englishItems={this.state.englishItems} makeOffer={this.makeOffer} />
                  }
                </React.Fragment>)} 
            />
            <Route exact path="/dutch" render={props => (
                <React.Fragment>
                  {
                    this.state.loading
                      ? <div class="center"><TrinityRingsSpinner size="100" color="darkblue" /></div>
                      : <Dutch dutchItems={this.state.dutchItems} makeOffer={this.makeOffer} />
                  }
                </React.Fragment>)} 
            />
            <Route exact path="/vickery" render={props => (
                <React.Fragment>
                  {
                    this.state.loading
                      ? <div class="center"><TrinityRingsSpinner size="100" color="darkblue" /></div>
                      : <Vickery vickeryItems={this.state.vickeryItems} makeOffer={this.makeOffer} />
                  }
                </React.Fragment>)} 
            />
            <Route exact path="/offersp" render={props => (
                <React.Fragment>
                  {
                    this.state.loading
                      ? <div class="center"><TrinityRingsSpinner size="100" color="darkblue" /></div>
                      : <Offersplaced placedOffers={this.state.placedOffers} purchaseItem={this.purchaseItem} />
                  }
                </React.Fragment>)} 
            />
            <Route exact path="/offersr" render={props => (
                <React.Fragment>
                  {
                    this.state.loading
                      ? <div class="center"><TrinityRingsSpinner size="100" color="darkblue" /></div>
                      : <Offersreceived receivedOffers={this.state.receivedOffers} approveOffer={this.approveOffer} />
                  }
                </React.Fragment>)} 
            />
          </Switch>
        </Router>
      );
    } else {
      return(
        <p style={{textAlign: "center"}}>Your current browser is not supported. Install the Metamask extension and try again.</p>
      );
    }
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Home';
import './App.css';
import Header from './Header'
import Main from './Main';
import { TrinityRingsSpinner } from 'react-epic-spinners';
import Web3 from 'web3';
import Nfto from '../abis/Nfto.json'

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should use the MetaMask extension!')
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Nfto.networks[networkId]
    if(networkData) {
      const nfto = web3.eth.Contract(Nfto.abi, networkData.address)
      this.setState({ nfto })
      const tokenID = await nfto.methods.tokenID().call()
      this.setState({ nfto })
      for (var i = 1; i <= tokenID; i++) {
        const item = await nfto.methods.items(i).call()
        if (item.isListed === true) {
          this.setState({
            listedItems: [...this.state.listedItems, item]
          })
        }
        if (item.owner === this.state.account) {
          this.setState({
            myItems: [...this.state.myItems, item]
          })
        }
      }
      this.setState({ loading: false})
    } else {
      window.alert('The forum contract could not be deployed to network')
    }
  }
  
  mintItem(price, name, description, cid){
    this.setState({ loading: true })
    this.state.nfto.methods.mintItem(window.web3.utils.toWei(price.toString(), 'ether'), name, description, cid).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.href = '/gallery'
    })
  }

  constructor(props){
    super(props)
    this.state = {
      loading: true,
      nfto: null,
      listedItems: [],
      myItems: []
    }
    this.mintItem = this.mintItem.bind(this)

  }

  render() {
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
              </React.Fragment>)} />
        </Switch>
      </Router>
    );
  }
}

export default App;

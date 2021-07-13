import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Home';
import './App.css';
import Header from './Header'
import Main from './Main';
import { TrinityRingsSpinner } from 'react-epic-spinners';


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      loading: false
    }
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
                    : <Main/>
                }
              </React.Fragment>)} />
        </Switch>
      </Router>
    );
  }
}

export default App;

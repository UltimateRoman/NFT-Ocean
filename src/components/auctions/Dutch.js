import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import {
  Grid,
  Card,
  CardContent,
  CardHeader
} from "@material-ui/core/";

const useStyles = ({
    root: {
      flexGrow: 1,
      //padding: theme.spacing(2)
    }
});

const WhiteTextTypography = withStyles({
  root: {
    color: "darkblue"
  }
})(Typography);

class Dutch extends Component {
  
  constructor(props) {
    super(props);
    this.priceinput = React.createRef();
  }

  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
          <br/><br/>          
            <Typography component="h1" variant="h2" align="center" color="inherit" gutterBottom>
                <WhiteTextTypography variant="h3">
                    Dutch Auction House
                </WhiteTextTypography>
            </Typography>
          <br /><br/>
          
        <center>
        <div className={classes.root}>
          <Grid
            container
            spacing={10}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {this.props.dutchItems.map((item) => (
                <Grid item xs={4} key={item.id}>
                <Card>
                    <CardHeader
                    title={item.name}    />
                    <CardContent>
                      {item.description}
                        <br/>
                        Current Price: {window.web3.utils.fromWei(item.latestPrice.toString(), 'Ether')} MATIC  
                        <br/>                 
                        <img src={`https://${item.cid}.ipfs.dweb.link`} height="250" width="350" alt="NFT image"/>
                    <br/><br/>
                    <h4 style={{color: "DarkCyan"}}>Bid for this NFT</h4>
                    <form onSubmit={(event)=>{
                      event.preventDefault();
                      const price = this.priceinput.current.value
                      this.props.makeOffer(item.id, price, "dutch")
                    }}>
                    <br/><br/>
                    <input type="text" class="form-control" id="exampleFormControlInput1" ref={this.priceinput} placeholder="Bid Price"/>
                    <br/><br/>
                    <button type="submit" class="btn btn-info mb-3">Make Offer</button>
                    </form>
                    <br/>
                    </CardContent>
                  </Card>
                </Grid>
            ))}
          </Grid>
        </div>
      </center>
      </React.Fragment>
      );
    }
  }
  
  export default withStyles(useStyles)(Dutch);
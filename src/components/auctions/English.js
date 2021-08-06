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



class English extends Component {

  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
          <br/><br/>          
            <Typography component="h1" variant="h2" align="center" color="inherit" gutterBottom>
                <WhiteTextTypography variant="h3">
                    English Auction House
                </WhiteTextTypography>
            </Typography>
          <br /><br/>
          
        <center>
        <div className={classes.root}>
        {this.props.englishItems.map((item) => (
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {this.props.englishItems.map((item) => (
                <Grid item xs={3} key={item.id}>
                <Card>
                    <CardHeader
                    title={item.name}    />
                    <CardContent>
                      {item.description}
                        <br/>
                        Current Price: {window.web3.utils.fromWei(item.latestPrice.toString(), 'Ether')} MATIC  
                        <br/>                 
                    <img src={item.cid} height="250" width="350" alt="NFT image"/>
                    <br/><br/>
                    <h4 style={{color: "DarkCyan"}}>Bid for this NFT</h4>
                    <form onSubmit={(event)=>{
                      event.preventDefault();
                      const price = this.price.value
                      this.props.makeOffer(item.id, price, "english")
                    }}>
                    <br/><br/>
                    <TextField id="price" ref={(input) => { this.price = input }} label="Bid Price" variant="outlined" required/>
                    <br/><br/>
                    <button type="submit" class="btn btn-info mb-3">Make Offer</button>
                    </form>
                    <br/>
                    </CardContent>
                  </Card>
                </Grid>
            ))}
          </Grid>
        ))}
        </div>
      </center>
      </React.Fragment>
      );
    }
  }
  
  export default withStyles(useStyles)(English);
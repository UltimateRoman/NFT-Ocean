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



class Yournfts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "english"
    }
    this.handleChange = this.handleChange.bind(this)

  }
  handleChange = (event) => {
    this.setState({category: event.target.value});
  };
  render() {
      const {classes} = this.props
    return (
      <React.Fragment>
          <br/><br/>
          
            <Typography component="h1" variant="h2" align="center" color="inherit" gutterBottom>
                <WhiteTextTypography variant="h3">
                    Your NFTs
                </WhiteTextTypography>
            </Typography>
          <br /><br/>
      <center>
        <div className={classes.root}>
        {this.props.myItems.map((item) => (
            <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            >
            {this.props.myItems.map((item) => (
                <Grid item xs={3} key={item.id}>
                <Card>
                    <CardHeader
                    title={`Name : ${item.name}`}    />
                    <CardContent>
                        {`Description : ${item.description}`}
                        <br/>
                        Base Price: {window.web3.utils.fromWei(item.latestPrice.toString(), 'Ether')}
                    
                    <img src={item.cid} height="250" width="350"/>
                    <br/>
                    <h4>List NFT for Auction</h4>
                    <InputLabel id="demo-simple-select-label">Auction method</InputLabel>
                    <form onSubmit={(event)=>{
                      event.preventDefault();
                      const category = this.state.category
                      const price = this.price.value
                      this.props.listItem(category, price)
                    }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.category}
                      onChange={this.handleChange}
                     >
                      <MenuItem value="english">English Auction</MenuItem>
                      <MenuItem value="dutch">Dutch Auction</MenuItem>
                      <MenuItem value="vickery">Vickery Auction</MenuItem>
                    </Select>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Price" variant="outlined" />
                    <br/><br/>
                    <button type="submit" class="btn btn-primary mb-3">List NFT for Auction</button>
                    </form>
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
  
  export default withStyles(useStyles)(Yournfts);
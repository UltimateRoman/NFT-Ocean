import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
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
    this.priceinput = React.createRef();

    this.state = {
      category: "english"
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (event) => {
    this.setState({category: event.target.value});
  }

  render() {
    const {classes} = this.props

    return (
      <React.Fragment>
        <br/><br/>          
        <Typography component="h1" variant="h2" align="center" color="Secondary"  gutterBottom>
            <WhiteTextTypography variant="h2"  >
                Your NFTs
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
            {this.props.myItems.map((item) => (
              <Grid item xs={4} key={item.id}>
                <Card style={{ padding: "5px", borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                  <Typography gutterBottom variant="h4" color="Primary" component="h1">
                    {item.name}
                  </Typography>
                  
                  <CardContent>
                    <h5 style={{ color: "SlateBlue"}}>Token ID: {item.id.toString()}</h5>
                    
                    Base Price: {window.web3.utils.fromWei(item.latestPrice.toString(), 'Ether')} MATIC | $ {(Math.round(parseFloat(window.web3.utils.fromWei(item.latestPrice.toString(), 'Ether'))*parseFloat(this.props.latestPrice.toString())*10000)/10000).toString()}
                    <br/><br/>
                    
                    <h5 style={{ color: "DarkBlue"}}>{item.description}</h5>  
                        
                    <img src={`https://${item.cid}.ipfs.dweb.link`} height="250" width="450" alt="NFT image"/>
                    <br/><br/><br/><hr/>

                    <h4 style={{color: "DarkSlateGray"}}>Auction this NFT</h4>
                    <InputLabel id="demo-simple-select-label">Choose an Auction method</InputLabel>
                    <br/>

                    <form onSubmit={(event)=>{
                      event.preventDefault();
                      const category = this.state.category
                      const price = this.priceinput.current.value
                      console.log(category,price)
                      this.props.listItem(item.id, category, price)
                    }}>
                      <div class="form-group mx-sm-5 mb-2">
                        <Select
                          labelId="demo-simple-select-label"
                          id="category"
                          ref={(input) => { this.category = input }}
                          value={this.state.category}
                          onChange={this.handleChange}
                          required
                        >
                          <MenuItem value="english">English Auction</MenuItem>
                          <MenuItem value="dutch">Dutch Auction</MenuItem>
                          <MenuItem value="vickery">Vickery Auction</MenuItem>
                        </Select>
                        <br/><br/>
                        <input type="text" class="form-control" id="exampleFormControlInput1" ref={this.priceinput} placeholder="Auctioning Price (MATIC)"/>
                      </div>
                      <br/>

                      <button type="submit" class="btn btn-info mb-3">Confirm</button>
                    </form>
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
  
  export default withStyles(useStyles)(Yournfts);
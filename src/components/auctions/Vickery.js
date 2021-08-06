import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { withStyles } from "@material-ui/core/styles";

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



class Vickery extends Component {
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
                    Vickery Auction House
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
            {this.props.vickeryItems.map((item) => (
                <Grid item xs={4} key={item.id}>
                <Card>
                    <Typography gutterBottom variant="h4" color="Primary" component="h1">
                       {item.name}
                     </Typography>
                  
                    <CardContent>
                     
                        <h5>
                          {item.description}
                        </h5>  
                        <img src={`https://${item.cid}.ipfs.dweb.link`} height="250" width="400" alt="NFT image"/>

                    <br/><br/><hr/>
                    <h4 style={{color: "DarkCyan"}}>Bid for this NFT</h4>
                    <form onSubmit={(event)=>{
                      event.preventDefault();
                      const price = this.priceinput.current.value
                      this.props.makeOffer(item.id, price, "vickery")
                    }}>
                    <br/>
                    <div class="form-group mx-sm-5 mb-2">
                    <input type="text" class="form-control" id="exampleFormControlInput1" ref={this.priceinput} placeholder="Bid Price (MATIC)"/>
                    </div>
                    <br/>
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
  
  export default withStyles(useStyles)(Vickery);
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


class Yournfts extends Component {
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
                    </CardContent>
                    <img src={item.cid} height="250" width="350"/>
                    <br/>
                    <button onClick={openModal}>List Item</button>
                    {showModal ? <Modal setShowModal={setShowModal} /> : null}
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
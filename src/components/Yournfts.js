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
                    title={`Name : ${item.name}`}
                    subheader={`Description : ${item.description}`}
                    />
                    <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Hello World
                    </Typography>
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
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import img1 from './image/4.jpg'
import img2 from './image/5.jpg'
import img3 from './image/6.jpg'
import Click from './clicks/Click'
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function Homepage() {
  const classes = useStyles();

  return (
    <React.Fragment>
        
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center"  color="textPrimary" gutterBottom>
              NFT Ocean
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            An NFT Marketplace with custom Auction and Sales mechanisms based on user preference

            </Typography>
            <center>
            <Click />
            </center>
            
          </Container>
        </div>
        
        <Container maxWidth="md">
                <Card>
                  <CardMedia
                    className={classes.cardMedia}
                    image={img1}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Vickery Auction
                    </Typography>
                    <Typography>
                    A Vickrey auction is a sealed-bid auction where bidders submit bids without knowing the bids of other people. However, as opposed to other sealed-bid auctions, the price paid is the second-highest bid price and not the winning bid price. In a Vickrey auction, the individual is bidding their true value and are not trying to assess what everyone else is going to bid. 
                    </Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardMedia
                    className={classes.cardMedia}
                    image={img2}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    English Auction
                    </Typography>
                    <Typography>
                    An English Auction, also referred to as an open cry ascending auction, starts by an auctioneer announcing the suggested opening bid or reserve price for the item on sale. The buyers with interest in the item start placing bids on the item on sale, with the auctioneer accepting higher bids as they come. The buyer with the highest bid at any time is considered the one with a standing bid, which can only be displaced by a higher bid from the floor. If there are no higher bids than the standing bid, the auctioneer announces the winner, and the item is sold to the person with the standing bid at a price equal to their bid. 
                    </Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardMedia
                    className={classes.cardMedia}
                    image={img3}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Dutch Auction
                    </Typography>
                    <Typography>
                    A Dutch auction is a price discovery process in which the auctioneer starts with the highest asking price and lowers it until it reaches a price level where the bids received will cover the entire offer quantity. Alternatively, a Dutch auction is known as a descending price auction or a uniform price auction. Dutch auctions are appropriate for instances where a large quantity of an item is being offered for sale, as opposed to just a single item. The goal of a Dutch auction is the find the optimal price at which to sell a security. 
                    </Typography>
                  </CardContent>
                </Card>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          NFT Ocean
        </Typography>
        <br/>
        <LinearProgress color="secondary"/>
        <br/>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        © 2021 NFT Ocean
        </Typography>
      </footer>
    </React.Fragment>
  );
}
export default Homepage;
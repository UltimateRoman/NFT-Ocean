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
import LinearProgress from '@material-ui/core/LinearProgress';
import Click from './Click'

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
        <LinearProgress />
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              NFT Ocean
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
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
                    Decentralized marketplace
                    </Typography>
                    <Typography>
                    NFTs allow creators to make money directly from their work. A great example is art, where someone would require an agent to sell and market their work. NFTs eliminate these middlemen and allow the artists or the original creators to interact and transact directly with their customers. 
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
                    Unique
                    </Typography>
                    <Typography>
                    They are rare in that only one of them can exist and can’t be easily forged. In most cases, an artist or a seller will have a handful of NFTs — as opposed to thousands. It is therefore safe to assume that you will be one of the few individuals that would own these collectibles
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
                    Immutable
                    </Typography>
                    <Typography>
                    The metadata on the token can never be altered by anyone. Also, it can neither get erased, misplaced nor be removed from the blockchain. Basically, they are meant to last forever as their data will always remain as is. This in itself, gives them collectability and high value.
                    </Typography>
                  </CardContent>
                </Card>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          NFT Ocean
        </Typography>
        <LinearProgress color="secondary"/>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Athul what should we add as footer
        </Typography>
      </footer>
    </React.Fragment>
  );
}
export default Homepage;
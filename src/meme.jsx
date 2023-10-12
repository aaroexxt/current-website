import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Button from  "@mui/material/Button";

const PREFIX = 'meme';

const classes = {
  root: `${PREFIX}-root`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    paddingLeft: "10vw",
    paddingRight: "10vw",
    fontSize: "1.5vw"
  }
}));

function Meme(props) {
  const {  pageChange } = props;
  window.scrollTo(0, 0);
  return (
    <Root className={classes.root}>
        <h1 style={{color: "red"}}>Meme Page</h1>
        <Button onClick={(e) => {e.preventDefault(); pageChange("Portfolio")}} variant="contained" color="primary">Go Back</Button>
        <h2>This is the about page</h2>
        <h3>This is the about page</h3>
        <h4>This is the about page</h4>
        <h5>This is the about page</h5>
        <h6>This is the about page</h6>
        <h3>Welcome to the meme page, friend</h3>
        <img style={{position: "absolute", top: "200px", right: "200px"}} src="content/dawg.png" height="400px" />
        <img src="content/memes/wackyHeadshot.jpg" width="750px" height="450px" />
        &nbsp;
        <img src="content/memes/ohYeah.png" height="400px" />
        <br />
        <h3>More delicious content</h3>
        <img src="content/memes/1.png" height="400px"/>
        &nbsp;
        <img src="content/memes/2.png" height="400px"/>
        &nbsp;
        <img src="content/memes/3.jpg" height="400px"/>
        &nbsp;
        <img src="content/memes/4.png" height="400px"/>
        &nbsp;
        <img src="content/memes/5.png" height="400px"/>
        &nbsp;
        <img src="content/memes/6.jpg" height="400px"/>
        <br />
        <h3> Fluffy getting stuck in a towel </h3>
        <video
          autoPlay
          loop
          controls
          muted
          style={{height: "500px"}}
        >
          <source src="content/memes/sillyBoi.mov"></source>
        </video>
        <br />
        <br />
        <Button onClick={(e) => {e.preventDefault(); pageChange("Portfolio")}} variant="contained" color="primary">OH GOD please go back</Button>
        <br />
        <br />
        
    </Root>
  );
}

Meme.propTypes = {
  classes: PropTypes.object.isRequired
};

export default (Meme);

import withStyles from '@mui/styles/withStyles';
import PropTypes from 'prop-types';
import Button from  "@mui/material/Button";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    paddingLeft: "10vw",
    paddingRight: "10vw",
    fontSize: "1.5vw"
  }
});

function Meme(props) {
  const { classes, pageChange } = props;
  window.scrollTo(0, 0);
  return (
    <div className={classes.root}>
        <h1>Meme Page</h1>
        <Button onClick={(e) => {e.preventDefault(); pageChange("Portfolio")}} variant="contained" color="primary">Go Back</Button>
        <h2>This is the about page</h2>
        <h3>This is the about page</h3>
        <h4>This is the about page</h4>
        <h5>This is the about page</h5>
        <h6>This is the about page</h6>
        <h3>Welcome to the meme page, friend</h3>
        <img src="content/memes/wackyHeadshot.jpg" width="750px" height="750px" />
        <br />
        <h3>More delicious content</h3>
        <img src="content/memes/1.png" height="400px"/>
        <img src="content/memes/2.png" height="400px"/>
        <img src="content/memes/3.jpg" height="400px"/>
        <img src="content/memes/4.png" height="400px"/>
        <img src="content/memes/5.png" height="400px"/>
        <img src="content/memes/6.jpg" height="400px"/>
        <br />
        <br />
        <Button onClick={(e) => {e.preventDefault(); pageChange("Portfolio")}} variant="contained" color="primary">OH GOD please go back</Button>
        <br />
        <br />
        
    </div>
  );
}

Meme.propTypes = {
  classes: PropTypes.object.isRequired
};
    
export default withStyles(styles)(Meme);

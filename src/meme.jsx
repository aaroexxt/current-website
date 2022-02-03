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
        <img src="content/wackyHeadshot.jpg" width="750px" height="750px" />
        <br />
        <Button onClick={(e) => {e.preventDefault(); pageChange("Portfolio")}} variant="contained" color="primary">OH GOD please go back</Button>
        <br />
        
    </div>
  );
}

Meme.propTypes = {
  classes: PropTypes.object.isRequired
};
    
export default withStyles(styles)(Meme);

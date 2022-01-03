import withStyles from '@mui/styles/withStyles';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(30),
    paddingRight: theme.spacing(30),
    fontSize: "1.5em"
  }
});

function eventPageChange(e, fn, arg) {
  e.preventDefault()
  fn(arg)
}

function About(props) {
  const { classes, pageChange } = props;
  return (
    <div className={classes.root}>
      <h6 className="title">About me!</h6>
      <center>
          <img
            className="about-headshot"
            width="350px"
            height="350px"
            src="content/headshotCrop.jpg"
          />
      </center>
      <br />
      <br />
      <span>
        Welcome to my website! I'm currently a freshman at MIT pursuing a B.S. in Mechanical Engineering with a minor in Computer Science. From high school robotics to MIT's Formula SAE team, I'm passionate about advanced technical work on a team or working by myself.
      </span>
      <p>Check out my <a href="#" onClick={(e) => {e.preventDefault(); pageChange("Portfolio")}}>portfolio</a> or <a href="#" onClick={(e) => {e.preventDefault(); pageChange("Resume")}}>resume</a> by using the tabs above, and don't hesitate to reach out to <a target="_blank" href="mailto:ambecker@mit.edu">ambecker@mit.edu</a> if you have any questions.</p>
      <p>Finally, please check out my <a href="https://github.com/aaroexxt" target="_blank">GitHub</a> for more up-to-date information on my latest projects, and my <a href="https://www.linkedin.com/in/aaron-m-becker/" target="_blank">LinkedIn</a> for information on jobs or internships.</p>
    </div>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired
};
    
export default withStyles(styles)(About);

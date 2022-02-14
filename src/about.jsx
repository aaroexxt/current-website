import withStyles from '@mui/styles/withStyles';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    paddingLeft: "10vw",
    paddingRight: "10vw",
    fontSize: "1.5vw"
  }
});

function About(props) {
  const { classes, pageChange } = props;
  window.scrollTo(0, 0);
  return (
    <div className={classes.root}>
      <h6 className="title">About me!</h6>
      <center>
          <img
            className="about-headshot"
            width="450px"
            height="450px"
            src="content/headshot.png"
          />
      </center>
      <br />
      <br />
      <span>
        Welcome to my website! I'm currently an undergraduate student at MIT pursuing a B.S. in Mechanical Engineering with a minor in Computer Science.
        <br />
        From highschool robotics to MIT's Formula SAE team, I’ve demonstrated my capacity to conduct advanced technical work on a team or in a self-directed fashion.
      </span>
      <p>Check out my <a href="#" onClick={(e) => {e.preventDefault(); pageChange("Portfolio")}}>portfolio</a> or <a href="#" onClick={(e) => {e.preventDefault(); pageChange("Resume")}}>resume</a> by using the tabs above, and don't hesitate to reach out to me by visiting my <a href="#" onClick={(e) => {e.preventDefault(); pageChange("Contact")}}>contact</a> page or directly at <a target="_blank" href="mailto:ambecker@mit.edu">ambecker@mit.edu</a> if you have any questions.</p>

      <div className="about-text">
        <img width="50px" height="50px" src="content/github.png"></img>
        <span>Take a look at my <a href="https://github.com/aaroexxt" target="_blank">GitHub</a>  for more up-to-date information on my latest projects!</span>
      </div>

      <br />
      <br />

      <div className="about-text">
        <img width="50px" height="50px" src="content/linkedin.png"></img>
        <span>Finally, here's my <a href="https://www.linkedin.com/in/aaron-m-becker/" target="_blank">LinkedIn</a> for information on jobs and internships.</span>
      </div>
      <br />
    </div>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired
};
    
export default withStyles(styles)(About);

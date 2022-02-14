import withStyles from '@mui/styles/withStyles';
import PropTypes from 'prop-types';
import ReactContactForm from "./emailForm.jsx"

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    paddingLeft: "10vw",
    paddingRight: "10vw",
    fontSize: "1.5vw"
  }
});

function Contact(props) {
  const { classes, pageChange } = props;
  window.scrollTo(0, 0);
  return (
    <div className={classes.root}>
        <h6 className="title">Contact me!</h6>

        <span>If you're interested in reaching out to discuss an opporutnity, or just want to say hi, I'd love to hear from you!</span>
        <br />
        <br />
        <div className="about-text">
        <img width="50px" height="50px" src="content/email.png"></img>
        <span>The fastest way to reach me is via email at <a target="_blank" href="mailto:ambecker@mit.edu">ambecker@mit.edu</a>.</span>
      </div>

      <br />
      <br />

      <div className="about-text">
        <img width="50px" height="50px" src="content/phone.png"></img>
        <span>Alternately, give my cell a call at <a href="tel:650-533-3585">650-533-3585</a>.</span>
      </div>
      <br />

      <h3>Use the form below to send me a message via email:</h3>
      <ReactContactForm to="ambecker@mit.edu" />
    </div>
  );
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired
};
    
export default withStyles(styles)(Contact);

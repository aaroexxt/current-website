import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import ReactContactForm from "./emailForm.jsx"

const PREFIX = 'contact';

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

function Contact(props) {
  const { } = props;
  window.scrollTo(0, 0);
  return (
    <Root className={classes.root}>
        <h6 className="title">Contact me!</h6>

        <span>If you're interested in reaching out to discuss an opportunity, or just want to say hi, I'd love to hear from you!</span>
        <br />
        <br />
        <div className="about-text">
        <img alt="email logo" width="50px" height="50px" src="content/email.png"></img>
        <span>The fastest way to reach me is via email at <a rel="noreferrer" target="_blank" href="mailto:ambecker@mit.edu">ambecker@mit.edu</a>.</span>
      </div>
      <br />

      <h3>Use the form below to send me a message via email:</h3>
      <ReactContactForm to="ambecker@mit.edu" />
    </Root>
  );
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired
};

export default (Contact);

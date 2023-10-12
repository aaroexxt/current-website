import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import ReactContactForm from "./emailForm.jsx";

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
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    fontSize: '1rem',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '10vw',
      paddingRight: '10vw',
      fontSize: '1.5vw'
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  }
}));

function Contact(props) {
  window.scrollTo(0, 0);
  return (
    <Root className={classes.root}>
      <h6 className="title">Contact me!</h6>

      <span>If you're interested in reaching out to discuss an opportunity, or just want to say hi, I'd love to hear from you!</span>
      <br />
      <br />

      <div className="contact-text">
        <img alt="email logo" width="10%" height="auto" src="content/email.png"></img>
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

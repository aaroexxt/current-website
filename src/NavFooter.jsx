import AppBar from "@material-ui/core/AppBar"
import Container from "@material-ui/core/Container"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Image from 'material-ui-image'

//Types and styling
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
      flexGrow: 1,
      position: "fixed",
      width: "100%",
      bottom: "0px"
    },
    typography: {
        flexGrow: 1,
        textAlign: "center"
    },
    appbar: {
        paddingTop: "10px",
        paddingBottom: "10px"
    }
  };
 
function NavFooter(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar
                position="static"
                color="primary-light"
                className={classes.appbar}
            >
                <Typography
                    variant="body1"
                    color="inherit"
                    className={classes.typography}
                >
                Designed by Aaron Becker, © {new Date().getFullYear()} | <a target="_blank" href="https://www.linkedin.com/in/aaron-m-becker/">LinkedIn</a>
                </Typography>
            </AppBar>
        </div>
        )
}

//next, tailwind, vercel, dribbble
NavFooter.propTypes = {
classes: PropTypes.object.isRequired
};
  
export default withStyles(styles)(NavFooter);
import AppBar from "@mui/material/AppBar"
import Typography from "@mui/material/Typography"

//Types and styling
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';

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
                color="inherit"
                className={classes.appbar}
            >
                <Typography
                    variant="body1"
                    color="inherit"
                    className={classes.typography}
                >
                Site Designed by Aaron Becker, © {new Date().getFullYear()} | <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/aaron-m-becker/">LinkedIn</a> | <a target="_blank" rel="noreferrer" href="mailto:ambecker@mit.edu">ambecker@mit.edu</a>
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
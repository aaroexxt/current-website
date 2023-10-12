import AppBar from "@mui/material/AppBar"
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography"

//Types and styling
import PropTypes from 'prop-types';

const PREFIX = 'NavFooter';

const classes = {
    root: `${PREFIX}-root`,
    typography: `${PREFIX}-typography`,
    appbar: `${PREFIX}-appbar`,
    hideOnMedium: `${PREFIX}-hideOnMedium`,
    hideOnSmall: `${PREFIX}-hideOnSmall`
};

const Root = styled('div')({
    [`&.${classes.root}`]: {
      flexGrow: 1,
      position: "fixed",
      width: "100%",
      bottom: "0px",
      zIndex: 999
    },
    [`& .${classes.typography}`]: {
        flexGrow: 1,
        textAlign: "center"
    },
    [`& .${classes.appbar}`]: {
        paddingTop: "10px",
        paddingBottom: "10px"
    },
    [`@media (max-width: 800px)`]: {
        [`& .${classes.hideOnMedium}`]: {
            display: "none"
        }
    },
    [`@media (max-width: 600px)`]: {
        [`& .${classes.hideOnSmall}`]: {
            display: "none"
        }
    }
});

function NavFooter(props) {
    return (
        <Root className={classes.root}>
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
                Site <a target="_blank" rel="noreferrer" href="https://github.com/aaroexxt/current-website">Designed</a> by Aaron Becker, © {new Date().getFullYear()} 
                <span className={classes.hideOnSmall}> | </span>
                <a className={classes.hideOnSmall} target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/aaron-m-becker/">LinkedIn</a>
                <span className={classes.hideOnMedium}> | </span>
                <a className={classes.hideOnMedium} target="_blank" rel="noreferrer" href="mailto:ambecker@mit.edu">ambecker@mit.edu</a>
                </Typography>
            </AppBar>
        </Root>
    );
}

export default (NavFooter);

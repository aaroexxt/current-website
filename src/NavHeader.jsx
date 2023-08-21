import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@mui/styles/withStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    position: "fixed",
    width: "100%",
    top: "0px"
  },
  title: {
    flexGrow: 1,
    "padding-right": theme.spacing(1),
    "white-space": "nowrap",
    "padding-top": theme.spacing(1)
  },
  subtitle: {
    flexGrow: 1,
    "padding-right": theme.spacing(1),
    "white-space": "nowrap",
    "padding-top": theme.spacing(1),
    "padding-bottom": theme.spacing(1)
  }
});

class NavHeader extends React.Component {
  generateTabs() {
    let tabs = []
    for (let i=0; i<this.props.tabs.length; i++) {
      let tab = this.props.tabs[i];

      tabs.push(<Tab key={i} label={tab[0]} {...a11yProps(i)} disabled={!tab[1]} />)
    }
    return tabs;
  }

  render() {
    const {classes} = this.props;
    
    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit">
          <Toolbar>
              <Typography className={classes.title} variant="h4">
                <span style={{cursor: "pointer"}} onClick={(e) => {e.preventDefault(); this.props.resetToPortfolio()}}>Aaron Becker</span>
                <Typography className={classes.subtitle}>
                  Undergraduate at the Massachusetts Institute of Technology
                </Typography>
              </Typography>

            <Tabs
              value={this.props.selected}
              onChange={this.props.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              {this.generateTabs()}
            </Tabs>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavHeader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavHeader);
import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const PREFIX = 'NavHeader';

const classes = {
  root: `${PREFIX}-root`,
  title: `${PREFIX}-title`,
  subtitle: `${PREFIX}-subtitle`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    position: "fixed",
    width: "100%",
    top: "0px"
  },

  [`& .${classes.title}`]: {
    flexGrow: 1,
    "paddingRight": theme.spacing(1),
    "whiteSpace": "nowrap",
    "paddingTop": theme.spacing(1)
  },

  [`& .${classes.subtitle}`]: {
    flexGrow: 1,
    "paddingRight": theme.spacing(1),
    "whiteSpace": "nowrap",
    "paddingTop": theme.spacing(1),
    "paddingBottom": theme.spacing(1)
  }
}));

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
    return (
      <Root className={classes.root} sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        position: "fixed",
        width: "100%",
        top: "0px",
        zIndex: 999,
        opacity: 0.95
      }}>
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
      </Root>
    );
  }
}

export default (NavHeader);
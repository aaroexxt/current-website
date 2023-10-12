import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const PREFIX = 'NavHeader';

const classes = {
    root: `${PREFIX}-root`,
    title: `${PREFIX}-title`,
    subtitle: `${PREFIX}-subtitle`,
    menuButton: `${PREFIX}-menuButton`,
    drawer: `${PREFIX}-drawer`,
    drawerItem: `${PREFIX}-drawerItem`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.root}`]: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        position: "fixed",
        width: "100%",
        top: "0px",
    },
    [`& .${classes.title}`]: {
        flexGrow: 1,
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(1),
    },
    [`& .${classes.subtitle}`]: {
        flexGrow: 1,
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    [`& .${classes.menuButton}`]: {
        display: 'none',
        [theme.breakpoints.down('md')]: {
            display: 'block',
        },
    },
    [`& .${classes.drawer}`]: {
        width: 250,
        flexShrink: 0
    },
    [`& .${classes.drawerItem}`]: {
        padding: theme.spacing(2),
        fontSize: '1.5rem',
        '&:hover': {  // Hover effect
            backgroundColor: 'rgba(0, 0, 0, 0.04)'  // Light gray background on hover
        }
    },
}));

class NavHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            isMobile: window.innerWidth <= 960,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ isMobile: window.innerWidth <= 960 });
    }

    toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({ drawerOpen: open });
    };

    handleTabClick = (index) => () => {
        this.props.handleChange(null, index);
        this.setState({ drawerOpen: false });
    };

    generateTabs = () => {
        let tabs = [];
        for (let i = 0; i < this.props.tabs.length; i++) {
            let tab = this.props.tabs[i];
            tabs.push(<Tab key={i} label={tab[0]} {...a11yProps(i)} disabled={!tab[1]} />);
        }
        return tabs;
    };

    generateDrawerItems = () => {
        let drawerItems = [];
        for (let i = 0; i < this.props.tabs.length; i++) {
            let tab = this.props.tabs[i];
            drawerItems.push(
                <ListItem 
                    button 
                    key={i} 
                    disabled={!tab[1]} 
                    onClick={this.handleTabClick(i)} 
                    className={classes.drawerItem}  // Apply the new class here
                    sx={{borderBottom: '2px solid rgba(0, 0, 0, 0.12)'}}
                >
                    {tab[0]}
                </ListItem>
            );
        }
        return drawerItems;
    };

    render() {
        const { isMobile } = this.state;

        return (
            <Root className={classes.root} sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                position: "fixed",
                width: "100%",
                top: "0px",
                zIndex: 999,
                opacity: 0.95,
            }}>
                <AppBar position="static" color="inherit">
                    <Toolbar>
                        <Typography className={classes.title} variant="h4" sx={{ flexGrow: 1 }}>
                            <span style={{ cursor: "pointer" }} onClick={(e) => { e.preventDefault(); this.props.resetToPortfolio() }}>
                                Aaron Becker
                            </span>
                            <Typography className={classes.subtitle} variant="subtitle1">
                                {isMobile ? 'Massachusetts Institute of Technology' : 'Undergraduate at the Massachusetts Institute of Technology'}
                            </Typography>
                        </Typography>

                        {isMobile ? (
                            <>
                                <IconButton
                                    edge="end"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={this.toggleDrawer(true)}
                                    sx={{ fontSize: 45 }}  // Changed font size to enlarge the icon
                                >
                                    <MenuIcon fontSize="inherit" />  {/* Changed to large size */}
                                </IconButton>
                                <Drawer
                                    className={classes.drawer}
                                    variant="temporary"
                                    anchor="right"
                                    open={this.state.drawerOpen}
                                    onClose={this.toggleDrawer(false)}
                                    ModalProps={{
                                        keepMounted: true, // Better open performance on mobile.
                                    }}
                                    sx={{fontSize: 27}}
                                >
                                    <List>
                                        {this.generateDrawerItems()}
                                    </List>
                                </Drawer>
                            </>
                        ) : (
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
                        )}
                    </Toolbar>
                </AppBar>
            </Root>
        );
    }
}

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

export default NavHeader;

//Basic react deps
import React from "react";
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import "./fonts/Raleway-Regular.ttf";
import "./fonts/OpenSans-Regular.ttf";
import "./fonts/Helvetica.ttf";
import './index.css';

//Specific components
import NavHeader from "./NavHeader.jsx";
import NavFooter from "./NavFooter.jsx";
import Portfolio from './portfolio.jsx';
import Resume from "./resume.jsx";
import About from './about.jsx';
import Meme from './meme.jsx';

//Util functions
import mutateState from "./mutateState.jsx";
import reportWebVitals from './reportWebVitals';
import { createContext } from './hotkeys';

//Local storage support
import { localStorageSave, localStorageGet } from './localStorageUtils';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Helvetica Neue',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(',')
  }
});

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: {
        options: [
          ["Portfolio", true], //name, enabled
          ["About", true],
          ["Resume", true]
        ],
        selected: 0
      }
    };

    this.componentCleanup = this.componentCleanup.bind(this);

  };

  handleMenuChange = (event, idx) => {
    if (idx == this.state.menu.selected) return; //make sure it's diff than what we have

    switch (idx) {
      case this.nameToMenuIdx("Portfolio"): //load box
        console.log("Portfolio selected original");
        break;
    }

    //Check that it's valid
    if (this.menuIdxToName(idx)) {
      //will return false if its not
      mutateState(this, {
        menu: { selected: idx },
      });
    }
  };

  componentDidMount() {
    //Meme page
    this.keyComboContext = createContext();
    this.keyComboContext.register('up up down down left right left right b a', () => {
      mutateState(this, {menu: {selected: "Meme"}});
    });
  
    //Setup componentCleanup handler for page reload
    window.addEventListener('beforeunload', this.componentCleanup);

    //Check if there is a preserved state, and if so, restore it otherwise perform first-time setup
    const retreivedState = localStorageGet("ambeckercom-menuState");

    if (retreivedState) {
      try {
        if (retreivedState.menu.options.length > 0) { //make sure menu is in a valid state
          this.setState(retreivedState);
        }
      } catch(e) {}
    }


    //Easter egg
    let egg = [
      "              /| ________________",
      "O|===|* >________________>",
      "             \\|",
      "easter egg: up up down down left right left right b a"
    ];

    for (let e in egg) {
      console.log(egg[e]);
    }
  }

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener('beforeunload', this.componentCleanup); // remove the event handler for normal unmounting
  }
  
  //Called before page is reloaded or component is unmounted
  componentCleanup() {
    if (this.state.menu.selected.toLowerCase() !== "meme") {
      //Preserve our state in localStorage
      localStorageSave("ambeckercom-menuState", this.state)
    }

    //Unbind hotkeys
    this.keyComboContext.disable();
  }

  render() {
    var content;
    switch (this.state.menu.selected) {
      /*********
      Home Page
       */
      case this.nameToMenuIdx("Portfolio"):
        content = (
          <Portfolio />
        );
        break;
      
      /*********
       * About Me Page
       */
      case this.nameToMenuIdx("About"):
        content = (
          <About 
            pageChange={(name) => {
              this.handleMenuChange(null, this.nameToMenuIdx(name))
            }}
          />
        );
        break;

      /*********
       * Resume Page
       */
      case this.nameToMenuIdx("Resume"):
        content = (
          <Resume
            filename="content/resume.pdf"
            saveFilename="AaronBeckerResume.pdf"
          />
        )
        break;

      /*********
       * Fun Meme Page
       */
      case "Meme":
        content = (
          <Meme
          pageChange={(name) => {
            this.handleMenuChange(null, this.nameToMenuIdx(name))
          }}
          />
        )
        break;

      /**************
      Default Display (error)
       */
      default:
        content = (
          <div style={{ color: "red", textAlign: "center" }}>
            <h1>
              {" "}
              Uh oh! Undefined internal render state '
              {this.menuIdxToName(this.state.menu.selected) ||
                this.state.menu.selected}
              ' :({" "}
            </h1>
            <h3>
              Contact Aaron ASAP, as you shouldn't see this in production, at <a rel="noreferrer" href="mailto:ambecker@mit.edu" target="_self">ambecker@mit.edu</a>
            </h3>
          </div>
        );
        break;
      }

      return (
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Box className="content">
              {content}
            </Box>
            <NavHeader
              selected={this.state.menu.selected}
              tabs={this.state.menu.options}
              handleChange={this.handleMenuChange}
              resetToPortfolio={() => {
                this.handleMenuChange(null, this.nameToMenuIdx("Portfolio")); //reset top menu state
              }}
            />
            <NavFooter/>
          </ThemeProvider>
        </StyledEngineProvider>
      )
    }

    menuIdxToName = (idx) => {
      return this.state.menu.options[idx] || false;
    };
  
    nameToMenuIdx = (name) => {
      for (let i = 0; i < this.state.menu.options.length; i++) {
        if (this.state.menu.options[i][0].toLowerCase() == name.toLowerCase())
          return i;
      }
  
      return false;
    };
}

ReactDOM.render( <Index />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

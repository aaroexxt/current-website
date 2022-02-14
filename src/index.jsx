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
import Contact from './contact.jsx';
import Meme from './meme.jsx';

//Util functions
import mutateState from "./mutateState.jsx";
import reportWebVitals from './reportWebVitals';
import { createContext } from './hotkeys';

//History API support
import history from 'history/hash';
import { parsePath } from 'history';

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
          ["Resume", true],
          ["Contact", true]
        ],
        selected: 0
      }
    };

    this.componentCleanup = this.componentCleanup.bind(this);

    this.unlistenHistory = history.listen(({ action, location }) => {
      // console.log(
      //   `The current URL is ${location.pathname}${location.search}${location.hash}`
      // );
      // console.log(`The last navigation action was ${action}`);
    
      if (action === "POP") { //wait for attempted url return
        let spl = window.location.hash.split("/");
        let nIdx = this.nameToMenuIdx(spl[0].replace("#", ""));
        if (typeof nIdx === 'number') {
          this.handleMenuChange(false, nIdx);
        }
      }
    });

  };

  handleMenuChange = (event, idx) => {
    if (idx === this.state.menu.selected) return; //make sure it's diff than what we have
    
    history.push(this.state.menu.options[idx][0].toLowerCase());

    //Check that it's valid
    let name = this.menuIdxToName(idx);
    if (name) {
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

    //Check if we have URL override
    const urlParams = parsePath(window.location.href);
    
    for (let i = 0; i < this.state.menu.options.length; i++) {
      let menuItemName = this.state.menu.options[i][0].toLowerCase();
      if (urlParams.hash.indexOf(menuItemName) > -1) {
        // console.log("URL override detected for " + this.state.menu.options[i][0]);
        mutateState(this, {menu: {selected: i}});

        if (menuItemName !== "Portfolio") { //portfolio is a special case that manages its own state
          history.push(menuItemName);
        }
      }
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
    //Unbind hotkeys
    this.keyComboContext.disable();

    //Cleanup history handler
    this.unlistenHistory();
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
       * Contact Page
       */
       case this.nameToMenuIdx("Contact"):
        content = (
          <Contact/>
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
      if (typeof(name) !== "string") return false;
      for (let i = 0; i < this.state.menu.options.length; i++) {
        if (this.state.menu.options[i][0].toLowerCase() === name.toLowerCase())
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

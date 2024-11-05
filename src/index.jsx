//Basic react deps
import React from "react";
import { createRoot } from 'react-dom/client';
import Box from "@mui/material/Box";
import { ThemeProvider, StyledEngineProvider, createTheme, adaptV4Theme } from '@mui/material/styles';
import "./fonts/Raleway-Regular.ttf";
import "./fonts/OpenSans-Regular.ttf";
import "./fonts/Helvetica.ttf";
import './index.css';

//Specific components
import NavHeader from "./NavHeader.jsx";
import NavFooter from "./NavFooter.jsx";
import Portfolio from './portfolio.jsx';
import PDFAsPage from "./PDFAsPage.jsx"
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

//URL sanitization for history injection
const sanitizeURL = (url) => {
  return url.toLowerCase().replace(/\s/g,'');
}

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: {
        options: [
          //name, enabled
          ["Portfolio", true],
          ["About", true],
          ["Slide Summary", true],
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
    
    history.push(sanitizeURL(this.state.menu.options[idx][0]));

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
    
    if (urlParams.hasOwnProperty("hash")) {
      for (let i = 0; i < this.state.menu.options.length; i++) {
        let menuItemName = sanitizeURL(this.state.menu.options[i][0]);
        if (urlParams.hash.indexOf(menuItemName) > -1) {
          // console.log("URL override detected for " + this.state.menu.options[i][0]);
          mutateState(this, {menu: {selected: i}});

          if (menuItemName.toLowerCase().indexOf("portfolio") === -1) { //portfolio is a special case that manages its own state
            history.push(menuItemName);
          }
        }
      }
    }


    //Easter egg
    let egg = [
      "    /|",
      "O|===|* >⎶⎶⎶⎶⎶⎶⎶⎶⎶⎶⎶⌦",
      "    \\|",
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
        console.log("RESUME")
        content = (
          <PDFAsPage
            key={1}
            filename="content/resume.pdf"
            saveFilename="AaronBeckerResume.pdf"
            downloadButtonLabel="Resume"
            displayAllPages={true}
          />
        )
        break;

      /*********
       * Slidedeck Summary Page
       */
      case this.nameToMenuIdx("Slide Summary"):
        console.log("SUMM")
        content = (
          <PDFAsPage
            key={2}
            filename="content/slides.pdf"
            saveFilename="AaronBeckerSummarySlides.pdf"
            downloadButtonLabel="Slides"
            displayAllPages={true}
          />
        )
        break;

      /*********
       * Contact Page
       */
       case this.nameToMenuIdx("Contact"):
        content = (
          <Contact
            pageChange={(name) => {
              this.handleMenuChange(null, this.nameToMenuIdx(name))
            }}
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
            <img src="content/dawg.png" height="400px" />
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
            <NavHeader
              selected={this.state.menu.selected}
              tabs={this.state.menu.options}
              handleChange={this.handleMenuChange}
              resetToPortfolio={() => {
                this.handleMenuChange(null, this.nameToMenuIdx("Portfolio")); //reset top menu state
              }}
            />
            <Box className="content">
              {content}
            </Box>
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
        if (sanitizeURL(this.state.menu.options[i][0]) === sanitizeURL(name))
          return i;
      }
  
      return false;
    };
}


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Index />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);

//Basic react deps
import React from "react";
import ReactDOM from "react-dom";
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

//Util functions
import mutateState from "./mutateState.jsx";
import reportWebVitals from './reportWebVitals';

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

  render() {
    console.log("CurrentState: " + this.state.menu.selected);

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
            console.log("NAMEFIRE",name)
            this.handleMenuChange(null, this.nameToMenuIdx(name))
          }}/>
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

      return [
        <NavHeader
          selected={this.state.menu.selected}
          tabs={this.state.menu.options}
          handleChange={this.handleMenuChange}
        />,
        <div className="content">
          {content}
        </div>,
        <NavFooter/>
      ];
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

import React from 'react';

//Mui packages
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, CardActionArea } from '@mui/material';

//Image zooming support
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

//Video support
import {
  Player,
  ControlBar,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton
} from 'video-react';
import 'video-react/dist/video-react.css'; // import css

//PDF support
import PDFViewer from './PDFViewer';

//Markdown rendering packages
import ReactMarkdown from 'react-markdown'
import remarkUnwrapImages from 'remark-unwrap-images'
import gfm from 'remark-gfm'
import mutateState from './mutateState';

//History API support
import history from 'history/hash';
import { parsePath } from 'history';

//All project data
import PortfolioData from './portfolioData.json';


//Single portfolio card containing some basic information about the project
class PortfolioItem extends React.Component {
  constructor(props) {
    super(props);

    const imPath = "content/pages/"+props.data.dirPrefix+"/"+props.data.image;
    this.state = {
      imagePath: imPath,
      oProps: props,
      imageLoaded: false,
      thumbPath: imPath.replace(/(\.[\w\d_-]+)$/i, '_thumb$1')
    }
  }

  handleImageLoaded(newState) {
    mutateState(this, {imageLoaded: newState})
  }

  render() {
    let props = this.state.oProps;
    return (
      <Card
        sx={{ maxWidth: 750 }}
        elevation={5}
        onClick={(e) => {e.preventDefault(); props.handleClick(props.data)}} //when card is clicked, call click handler
      > 
        <CardActionArea>
          {(!this.state.imageLoaded) ? ( //Show low-quality card image initially
            <CardMedia
              component="img"
              height="300"
              image={this.state.thumbPath}
              alt={props.data.title}
            /> ) : null
          }
          <CardMedia
            component="img"
            height="400"
            image={this.state.imagePath}
            alt={props.data.title}
            className={!this.state.imageLoaded ? "invisible" : ""} // Set to invisible while loading
            onLoad={() => {this.handleImageLoaded(true)}} //Call image handler when fully loaded
          />

          <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{paddingLeft: '1em', paddingRight: '1em'}}>
              {props.data.title} ({props.data.date})
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{paddingLeft: '1em', paddingRight: '1em'}}>
              {props.data.description}
          </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.imageLoaded) {
      return true;
    }
    return false;
  }
};

const CustomMarkdownImage = props => {
  let movieExtensions = ["mp4", "webm", "ogg", "mov"];
  if (props.hasOwnProperty("src") && movieExtensions.some(v => props.src.includes(v))) { //do we have a valid file extension, and is it a movie?
    return <PlayableVideo {...props}/>;
  }

  let pdfExtensions = ["pdf"];
  if (props.hasOwnProperty("src") && pdfExtensions.some(v => props.src.includes(v))) { //do we have a valid file extension, and is it a pdf?
    return <PDFViewer
            filename={props.src}
            class={"portfolioPDFViewer"}
          />;
  }

  let audioExtensions = ["mp3", "wav", "aac", "flac", "m4a", "wma", "ogg"];
  if (props.hasOwnProperty("src") && audioExtensions.some(v => props.src.includes(v))) { //do we have a valid file extension, and is it an audio file?
    return <ReactAudioPlayer {...props} controls/>;
  }
  
  return (
    <ZoomableImage {...props}/>
  )
};

class ZoomableImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isZoomed: false,
      oProps: props,
      imageLoaded: false,
      imageSRC: "",
      previewSRC: ""
    }

    if (props.hasOwnProperty("src")) {
      mutateState(this, {
        imageSRC: props.src,
        previewSRC: props.src.replace(/(\.[\w\d_-]+)$/i, '_thumb$1')
      })
    }
  }

  handleImgLoad() {
    mutateState(this, {imageLoaded: true})
  }

  handleZoomChange(zoomState) {
    if (this.state.imageLoaded) {
      mutateState(this, {isZoomed: zoomState})
    }
  }

  render() {
    // Selectively render alt text if it exists
    let alt;
    if (this.state.oProps.hasOwnProperty("alt") && this.state.oProps.alt) {
      alt = (<p className={(this.state.isZoomed) ? "zoomed-text imageAlt" : "imageAlt"}> {this.state.oProps.alt} </p>);
    } else {
      alt = null;
    }

    return (
        <ControlledZoom isZoomed={this.state.isZoomed} onZoomChange={(zoomState) => {this.handleZoomChange(zoomState)}}>
          <div className={"zoom-container"}>

            <img className={(!this.state.imageLoaded) ? "invisible" : ""} onLoad={() => this.handleImgLoad()} {...this.state.oProps}/>

            {(!this.state.imageLoaded) ? <img src={this.state.previewSRC}/> : null}

            {alt}
          </div>
        </ControlledZoom>
    );
  }
}

class PlayableVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oProps: props,
      videoSRC: "",
      previewSRC: ""
    }

    if (props.hasOwnProperty("src")) {
      mutateState(this, {
        videoSRC: props.src,
        previewSRC: props.src.replace(/(\.[\w\d_-]+)$/i, '_thumb.jpg')
      })
    }
  }

  render() {
    return (
      <Player
        playsInline
        fluid={false}
        height={"200px"}
        autoPlay
        loop
        poster={this.state.previewSRC}
        muted={true}
      >
        <source {...this.state.oProps}/>

        <ControlBar>
          <CurrentTimeDisplay order={4.1} />
          <TimeDivider order={4.2} />
          <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
          <VolumeMenuButton disabled />
        </ControlBar>
      </Player>
    )
  }
}

export default class Portfolio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      singleProjectView: false, //are we in SPV?
      singleProjectData: {}, //selected project data
      singleProjectMarkdown: "" //actual markdown from selected project
    }

    this.baseURL = new URL(window.location.href).origin;

    this.unlistenHistory = history.listen(({ action, location }) => {
      if (action === "POP") { //wait for attempted url return
        let spl = window.location.hash.split("/");
        let foundProject = false;
        if (spl.length > 1) {
          for (let i=0; i<PortfolioData.projects.length; i++) {
            if (PortfolioData.projects[i].dirPrefix.indexOf(spl[1].replace("#","")) !== -1) {
              //HandleProjectClick will deal with history injection
              this.handleProjectClick(PortfolioData.projects[i], true);
              foundProject = true;
              break;
            }
          }
        }

        if (!foundProject) { //baseURL, so return to normal
          //HandleProjectReturn will also deal with history injection
          this.handleProjectReturn(true);
        }
      }
    });
  };

  //Load a single markdown file into state
  async loadMarkdownFile(prefix, file) {
    let response = await fetch(prefix+file);
    if (response.ok) {
      response.text().then(data => {
        if (data.indexOf("<html lang=\"en\">") === -1) { //make sure we haven't fetched a page by accident
          mutateState(this, {
            singleProjectMarkdown: 
              //Transform image URLs in markdown to include path
              data.replace(/(!\[.*?\]\()(.+?)(\))/g, function(whole, a, b, c) {
                if (b.indexOf("content/pages/") === -1) return a + prefix + b + c;
                return a+b+c; //no transformation necessary
            })
          });
        } else {
          mutateState(this, {singleProjectMarkdown: "# This project is currently under construction! \n Error: mdNotFound '"+file+"'"})
        }

      }).catch(e => {
        mutateState(this, {singleProjectMarkdown: "# This project is currently under construction! \n Error: mdParseError '"+file+"'"})
      })
    } else {
      mutateState(this, {singleProjectMarkdown: "# This project is currently under construction! \n Error: mdFetchErr '"+file+"'"})
    }
  }

  //Handle a single project being clicked to go to full screen view
  handleProjectClick(projectData, toPop) {
    mutateState(this, {
      singleProjectView: true,
      singleProjectData: projectData
    });

    mutateState(this, {
      singleProjectMarkdown: "### Loading project! Hang tight...\n![](/content/loading.gif)"
    })
    this.loadMarkdownFile(this.baseURL + "/content/pages/"+projectData.dirPrefix+"/",projectData.markdown);

    //If toPop is defined, we're popping from history, so don't push
    if (!toPop) {
      history.push("portfolio/"+projectData.dirPrefix);
    }
  }

  //Handle the 'return to projects view'
  handleProjectReturn(toPop) {
    mutateState(this, {singleProjectView: false});

    if (!toPop) {
      history.push("portfolio");
    }
  }


  componentDidMount() {
    //Check if we have URL overrides
    const urlParams = parsePath(window.location.href);  
    if (urlParams.hasOwnProperty("hash")) {
      for (let i=0; i<PortfolioData.projects.length; i++) {
        if (urlParams.hash.toLowerCase().indexOf(PortfolioData.projects[i].dirPrefix.toLowerCase()) !== -1) {
          this.handleProjectClick(PortfolioData.projects[i], true);
          break;
        }
      }
    }
  }

  componentWillUnmount() {
    //Cleanup history listeners
    this.unlistenHistory();
  }

  render() {
    //Single project markdown view, with return button
    if (this.state.singleProjectView) {
      let sp = this.state.singleProjectData;
      return (
        <center className={"portfolioViewContainer"}>
          <h1 style={{fontSize: "1.5rem"}}>{sp.title} ({sp.date})</h1>
          <Button
            onClick={(e) => {e.preventDefault(); this.handleProjectReturn()}}
            variant="outlined"
          >
            Return to All Projects
          </Button>
          <p>{sp.description}</p>
          <hr style={{width: "40%"}}></hr>
          <div className="markdownContainer">
            <ReactMarkdown
              remarkPlugins={
                [gfm, remarkUnwrapImages]
              }
              components={{img: CustomMarkdownImage}}
            >
              {this.state.singleProjectMarkdown}
            </ReactMarkdown>
          </div>
          <br></br>
          <Button
            onClick={(e) => {e.preventDefault(); this.handleProjectReturn()}}
            variant="outlined"
          >
            Return to All Projects
          </Button>
        </center>
      )
    }

    //Create empty array to populate with projects
    let categories = PortfolioData.categories;
    let sorted = categories.map((itemName, index) => { //object with array of projects
      return []
    })

    //Add projects into each category
    for (let i=0; i<PortfolioData.projects.length; i++) {
      let project = PortfolioData.projects[i];

      if (project.hasOwnProperty("category")) {
        let category = project.category;
        let categoryIndex = categories.indexOf(category);

        if (categoryIndex < 0) { //if we haven't matched an existing category
          sorted[categories.length-1].push(project); //push to last category
        } else {
          sorted[categoryIndex].push(project);
        }
      } else {
        sorted[categories.length-1].push(project); //push to last category
      }
    }

    //Card view, with all projects laid out
    return (
      <div className="home">
        <Box sx={{ flexGrow: 1, paddingLeft: "1em", paddingRight: "1em" }}>
          {categories.map((category, index) => (
            <div key={"cat-outer-"+index}>
              <h1 style={{fontSize: "1.5rem"}}>⭐ {category}</h1>
              <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {sorted[index].map((items, index) => (
                  <Grid item xs={16} sm={8} md={4} key={"sort-inner-"+index}>
                    <PortfolioItem
                      data={items}
                      handleClick={projectData => {
                        this.handleProjectClick(projectData)
                      }}
                    />
                  </Grid>
                ))}  
              </Grid>
              <br />
              <br />
            </div>
          ))}
        </Box>
      </div>
    );
  }
}


import React, { useState, useCallback } from 'react';

//Mui packages
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, CardActionArea, CardActions } from '@mui/material';

//Image zooming support
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

//Video support
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton
} from 'video-react';
import 'video-react/dist/video-react.css'; // import css

//Markdown rendering packages
import ReactMarkdown from 'react-markdown'
import remarkUnwrapImages from 'remark-unwrap-images'
import gfm from 'remark-gfm'
import mutateState from './mutateState';

function createInstance() {
  var func = null;
  return {
    save: function(f) {
      func = f;
    },
    restore: function(context) {
      func && func(context);
    }
  }
}


//Single portfolio card containing some basic information about the project
function PortfolioItem(props) {
  let imagePath = "content/pages/"+props.data.dirPrefix+"/"+props.data.image;

  return (
    <Card
      sx={{ maxWidth: 750 }}
      elevation={5}
      onClick={(e) => {e.preventDefault(); props.handleClick(props.data)}} //when card is clicked, call click handler
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={imagePath}
          alt={props.data.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.data.title} ({props.data.date})
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const CustomMarkdownImage = props => {
  let movieExtensions = ["mp4", "webm", "ogg", "mov"];
  // if (props.hasOwnProperty("src") && movieExtensions.some(v => props.src.includes(v))) { //do we have a valid file extension, and is it a movie?
  //   return PlayableVideo(props);
  // }
  
  return ZoomableImage(props);
};

const ZoomableImage = props => {
  const [isZoomed, setIsZoomed] = useState(false)

  const handleImgLoad = useCallback(() => {
    setIsZoomed(true)
  }, [])

  const handleZoomChange = useCallback(shouldZoom => {
    setIsZoomed(shouldZoom)
  }, [])

  return (
      <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
        <div className={"zoom-container"}>
          <img {...props}/>
          {<p className={(isZoomed && props.hasOwnProperty("alt") && props.alt != "") ? "zoomed-text" : null}> {props.alt} </p>}
        </div>
      </ControlledZoom>
  );
}

const PlayableVideo = props => {
  return (
    <Player
      playsInline
      fluid={false}
      width={"21%"}
      height={"auto"}
      autoPlay
      loop
      muted={true}
    >
      <source {...props}/>

      <ControlBar>
        <CurrentTimeDisplay order={4.1} />
        <TimeDivider order={4.2} />
        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
        <VolumeMenuButton disabled />
      </ControlBar>

      
    </Player>
  )
}

export default class Portfolio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //loading/error are for initial JSON file
      loading: true,
      error: false,
      //ItemData from JSON
      itemData: {},

      singleProjectView: false, //are we in SPV?
      singleProjectData: {}, //selected project data
      singleProjectMarkdown: "" //actual markdown from selected project
    }

    //Perform initial setup to load JSON configuration file
    this.setup()

  };

  //Load JSON file with project information
  async setup() {
    let response = await fetch("content/portfolioData.json");
    if (response.ok) {
      response.json().then(data => {
        this.setState({loading: false, error: false, itemData: data})
      }).catch(e => {
        this.setState({loading: false, error: true})
      })
    } else {
      this.setState({loading: false, error: true})
    }
  }

  //Load a single markdown file into state
  async loadMarkdownFile(prefix, file) {
    let response = await fetch(prefix+file);
    if (response.ok) {
      response.text().then(data => {
        mutateState(this, {
          singleProjectMarkdown: 
            //Transform image URLs in markdown to include path
            data.replace(/(!\[.*?\]\()(.+?)(\))/g, function(whole, a, b, c) {
              if (b.indexOf("content/pages/") == -1) return a + prefix + b + c;
              return a+b+c; //no transformation necessary
          })
        })

      }).catch(e => {
        mutateState(this, {singleProjectMarkdown: "# Parsing error loading '"+file+"'"})
      })
    } else {
      mutateState(this, {singleProjectMarkdown: "# Fetch error loading '"+file+"'"})
    }
  }

  //Handle a single project being clicked to go to full screen view
  handleProjectClick(projectData) {
    mutateState(this, {singleProjectView: true, singleProjectData: projectData, singleProjectMarkdown: "# Loading"});
    this.loadMarkdownFile("content/pages/"+projectData.dirPrefix+"/",projectData.markdown);
  }

  handleProjectReturn() {
    mutateState(this, {singleProjectView: false});
  }

  render() {
    //Loading state - while we're waiting for JSON file
    if (this.state.loading) {
      return (
        <center>
          <h1> Loading Portfolio Data, Please Wait...</h1>
        </center>
      );
    }


    //Error state - JSON file failed to load
    if (this.state.error) {
      return (
        <center>
          <h1>Error Loading Portfolio Data</h1>
          <br></br>
          <h2>If you see this in production, please contact Aaron at ambecker@mit.edu immediately.</h2>
        </center>
      )
    }

    //Single project markdown view, with return button
    if (this.state.singleProjectView) {
      let sp = this.state.singleProjectData;
      return (
        <center className={"portfolioViewContainer"}>
          <h1>{sp.title} ({sp.date})</h1>
          <Button
            onClick={(e) => {e.preventDefault(); this.handleProjectReturn()}}
            variant="outlined"
          >
            Return to All Projects
          </Button>
          <p>{sp.description}</p>
          <hr style={{width: "40%"}}></hr>
          <div className={"markdownContainer"}>
            <ReactMarkdown
              remarkPlugins={
                [gfm],
                [remarkUnwrapImages]
              }
              components={{img: CustomMarkdownImage}}
            >
              {this.state.singleProjectMarkdown}
            </ReactMarkdown>
          </div>
        </center>
      )
    }

    //Card view, with all projects laid out
    return (
      <div className="home">
        <Box sx={{ flexGrow: 1, paddingLeft: "1em", paddingRight: "1em" }}>
          <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {this.state.itemData.map((item, index) => (
              <Grid item xs={16} sm={8} md={4} key={index}>
                <PortfolioItem
                  data={item}
                  handleClick={projectData => {
                    this.handleProjectClick(projectData)
                  }}
                />
              </Grid>
            ))}  
          </Grid>
        </Box>
      </div>
    );
  }

  // componentWillMount: function() {
  //   this.props.instance.restore(this)
  // },
  // componentWillUnmount: function() {
  //   var state = this.state
  //   this.props.instance.save(function(ctx){
  //     ctx.setState(state)
  //   })
  // }
}


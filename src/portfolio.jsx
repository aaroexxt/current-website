import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, CardActionArea, CardActions } from '@mui/material';
import mutateState from './mutateState';


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
            {props.data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.data.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date: {props.data.date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default class Portfolio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: false,
      itemData: {},
      singleProjectView: false,
      singleProjectData: {}
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

  //Handle a single project being clicked to go to full screen view
  handleProjectClick(projectData) {
    mutateState(this, {singleProjectView: true, singleProjectData: projectData});
  }

  handleProjectReturn() {
    mutateState(this, {singleProjectView: false});
  }

  render() {
    if (this.state.loading) {
      return (
        <center>
          <h1> Loading Portfolio Data, Please Wait...</h1>
        </center>
      );
    } else {
      if (this.state.error) {
        return (
          <center>
            <h1>Error Loading Portfolio Data</h1>
            <br></br>
            <h2>If you see this in production, please contact Aaron at ambecker@mit.edu immediately.</h2>
          </center>
        )
      } else {
        if (this.state.singleProjectView) {
          let sp = this.state.singleProjectData;
          return (
            <center>
              <p>Project Name: {sp.title}</p>
              <p>Markdown Link (Todo): {sp.markdown}</p>
              <Button onClick={(e) => {e.preventDefault(); this.handleProjectReturn()}}> Return </Button>
            </center>
          )
        } else {
          return (
            <div className="home">
              <Box sx={{ flexGrow: 1 }}>
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
      }
    }
  }
}


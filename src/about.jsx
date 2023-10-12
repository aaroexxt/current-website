import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';

const PREFIX = 'about';

const classes = {
  root: `${PREFIX}-root`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    fontSize: '1rem',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '10vw',
      paddingRight: '10vw',
      fontSize: '1.5vw'
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  }
}));

function About(props) {
  const { pageChange } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  window.scrollTo(0, 0);
  const desktopContent = (
    <>
      <span>
        Welcome to my website! I'm currently an undergraduate student at <span className="highlight">MIT</span> pursuing a B.S. in <span className="highlight">Mechanical Engineering</span> with a minor in <span className="highlight">Computer Science</span>.
        <br />
        From high school robotics to MIT's Formula SAE team, I’ve demonstrated my capacity to conduct advanced technical work on a team or in a self-directed fashion.
      </span>
      <p>Check out my <a rel="noreferrer" href="#" onClick={(e) => { e.preventDefault(); pageChange("Portfolio") }}>portfolio</a> or <a rel="noreferrer" href="#" onClick={(e) => { e.preventDefault(); pageChange("Resume") }}>resume</a> by using the tabs above, and don't hesitate to reach out to me by visiting my <a rel="noreferrer" href="#" onClick={(e) => { e.preventDefault(); pageChange("Contact") }}>contact</a> page or directly at <a rel="noreferrer" target="_blank" href="mailto:ambecker@mit.edu">ambecker@mit.edu</a> if you have any questions.</p>

      <div className="about-text">
        <img alt="GitHub logo" width="50px" height="50px" src="content/github.png"></img>
        <span>Take a look at my <a href="https://github.com/aaroexxt" rel="noreferrer" target="_blank">GitHub</a> for more up-to-date information on my latest projects!</span>
      </div>
      <br />
      <div className="about-text">
        <img alt="LinkedIn logo" width="50px" height="50px" src="content/linkedin.png"></img>
        <span>Finally, here's my <a href="https://www.linkedin.com/in/aaron-m-becker/" rel="noreferrer" target="_blank">LinkedIn</a> for information on jobs and internships.</span>
      </div>
    </>
  );

  const mobileContent = (
    <>
      <span>
      Welcome to my website! I'm currently an undergraduate student at <span className="highlight">MIT</span> pursuing a B.S. in <span className="highlight">Mechanical Engineering</span> with a minor in <span className="highlight">Computer Science</span>.
      </span>
      <br />
      <br />
      <span>
      From high school robotics to MIT's Formula SAE team, I’ve demonstrated my capacity to conduct advanced technical work on a team or in a self-directed fashion.
      </span>
      <br />
      <br />
      <div className="about-text">
        <img alt="GitHub logo" width="50px" height="50px" src="content/github.png"></img>
        <span>See my <a href="https://github.com/aaroexxt" rel="noreferrer" target="_blank">GitHub</a>, with all of my latest projects.</span>
      </div>
      <br />
      <br />
      <div className="about-text">
        <img alt="LinkedIn logo" width="50px" height="50px" src="content/linkedin.png"></img>
        <span>Connect on <a href="https://www.linkedin.com/in/aaron-m-becker/" rel="noreferrer" target="_blank">LinkedIn</a> for information on previous work experience.</span>
      </div>
      <br />
      <br />
      <div className="center-button">
        <Button
          onClick={(e) => {e.preventDefault(); pageChange("Portfolio")}}
          variant="outlined"
        >
          Return to Project Portfolio
        </Button>
      </div>
    </>
  );
  

  return (
    <Root className={classes.root}>
      <h6 className="title">About me!</h6>
      <center>
        <img
          className="about-headshot"
          width="50%"
          height="auto"
          src="content/headshot.png"
          alt="headshot"
        />
      </center>
      <br />
      <br />
      {isDesktop ? desktopContent : mobileContent}
      <br />
    </Root>
  );
}

export default About;

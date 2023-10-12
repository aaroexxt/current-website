import React from "react";
import { styled } from '@mui/material/styles';
import { saveAs } from "file-saver";
import Button from "@mui/material/Button";
import mutateState from "./mutateState.jsx";
import PDFViewer from "./PDFViewer.jsx";

const PREFIX = 'resume';

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
        paddingLeft: theme.spacing(20),
        paddingRight: theme.spacing(20),
        fontSize: '1.5em'
      },
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
      }
    }
}));

class Resume extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filename: props.filename,
            saveFilename: props.saveFilename,
            downloading: false
        }
        
    }

    render() {
        return (
            <Root className={classes.root} id="resumeContainer">
                <center>
                    <Button
                        variant="outlined"
                        onClick={this.handleResumeSave}
                        disabled={this.state.downloading}
                        >
                    Click Here to Download Resume
                    </Button>
                </center>
                    <br></br>
                    <PDFViewer
                        filename={new URL(window.location.href).origin+"/"+this.state.filename}
                        class={"resumePDFViewer"}
                    />
            </Root>
        );
    }

    handleResumeSave = async () => {
        mutateState(this, {downloading : true});
        let loaded = await fetch(this.state.filename);
        saveAs(await loaded.blob(), this.state.saveFilename);
        mutateState(this, {downloading : false});
    };

    componentDidMount() {
        this.targetElement = document.querySelector('#resumeContainer');
    }
}

export default (Resume);
  
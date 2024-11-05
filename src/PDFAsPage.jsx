import React from "react";
import { styled } from '@mui/material/styles';
import { saveAs } from "file-saver";
import Button from "@mui/material/Button";
import mutateState from "./mutateState.jsx";
import PDFViewerSinglePage from "./PDFViewerSinglePage.jsx";
import PDFViewerMultipage from "./PDFViewerMultipage.jsx";

const PREFIX = 'pdfpage';

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

class PDFAsPage extends React.Component {
    constructor(props) {
        super(props);

        // Filename doesn't contain baseURL?
        let needsBaseURL = false;
        if (props.filename.indexOf("http://") == -1 && props.filename.indexOf("https://") == -1) {
            needsBaseURL = true;
        }

        this.state = {
            filename: needsBaseURL ? new URL(window.location.href).origin+"/"+props.filename : props.filename,
            saveFilename: props.saveFilename,
            downloadButtonLabel: props.downloadButtonLabel,
            displayAllPages: props.displayAllPages ? props.displayAllPages : false,
            downloading: false
        }
        
    }

    render() {
        return (
            <Root className={classes.root}>
                <center>
                    <Button
                        variant="outlined"
                        onClick={this.handlePDFSave}
                        disabled={this.state.downloading}
                        >
                    Click Here to Download {this.state.downloadButtonLabel}
                    </Button>
                </center>
                    <br></br>
                    {this.state.displayAllPages ? 
                        <PDFViewerMultipage
                            filename={this.state.filename}
                            class={"resumePDFViewer"}
                        />
                        :
                        <PDFViewerSinglePage
                            filename={this.state.filename}
                            class={"resumePDFViewer"}
                        />
                    }

            </Root>
        );
    }

    handlePDFSave = async () => {
        mutateState(this, {downloading : true});
        let loaded = await fetch(this.state.filename);
        saveAs(await loaded.blob(), this.state.saveFilename);
        mutateState(this, {downloading : false});
    };
}

export default (PDFAsPage);
  
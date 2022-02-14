import React from "react";
import PropTypes from 'prop-types';

import { saveAs } from "file-saver";
import Button from "@mui/material/Button";
import mutateState from "./mutateState.jsx";
import withStyles from '@mui/styles/withStyles';

import PDFViewer from "./PDFViewer.jsx";

import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const styles = (theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      paddingLeft: theme.spacing(20),
      paddingRight: theme.spacing(20),
      fontSize: "1.5em"
    }
  });

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
        const {classes} = this.props;
        return (
            <div className={classes.root} id="resumeContainer">
                <center>
                    <Button
                        variant="outlined"
                        onClick={this.handleResumeSave}
                        disabled={this.state.downloading}
                        >
                    Click Here to Download Resume
                    </Button>
                    <br></br>
                    <br></br>
                    <PDFViewer
                        filename={this.state.filename}
                        class={"resumePDFViewer"}
                    />
                </center>
            </div>
        )
    }

    handleResumeSave = async () => {
        mutateState(this, {downloading : true});
        let loaded = await fetch(this.state.filename);
        saveAs(await loaded.blob(), this.state.saveFilename);
        mutateState(this, {downloading : false});
    };

    componentWillUnmount() {
        clearAllBodyScrollLocks();
    }

    componentDidMount() {
        this.targetElement = document.querySelector('#resumeContainer');
        window.scrollTo(0, 0);
        disableBodyScroll(this.targetElement);
    }
}

Resume.propTypes = {
    classes: PropTypes.object.isRequired
};
      
export default withStyles(styles)(Resume);
  
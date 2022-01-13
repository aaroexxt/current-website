import React, { useState } from "react";
import PropTypes from 'prop-types';

import { saveAs } from "file-saver";
import Button from "@mui/material/Button";
import mutateState from "./mutateState.jsx";
import withStyles from '@mui/styles/withStyles';

import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

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
                <Button
                    variant="outlined"
                    onClick={this.handleResumeSave}
                    disabled={this.state.downloading}
                    >
                Click to Download Resume
                </Button>
                <br></br>
                <br></br>
                <PDFViewer filename={this.state.filename} />
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

function PDFViewer(props) {
    const defaultLayoutPluginInstance = defaultLayoutPlugin(); //keeps track of state
    const openLinkInNewTab = (e) => {
        e.preventDefault();
        if (e.target.tagName.toLowerCase() === 'a') {
            window.open( e.target.href );
        }
    }

    return (
        <Worker workerUrl="pdf.worker.js">
            <div className={"resumeViewer"}>
                <Viewer
                    fileUrl={`${process.env.PUBLIC_URL}/${props.filename}`}
                    plugins={[defaultLayoutPluginInstance]}
                    onClick={openLinkInNewTab}
                />
            </div>
        </Worker>
    )
}

Resume.propTypes = {
    classes: PropTypes.object.isRequired
};
      
export default withStyles(styles)(Resume);
  
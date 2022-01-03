import React from "react";
import PropTypes from 'prop-types';

import { saveAs } from "file-saver";
import Button from "@material-ui/core/Button";
import mutateState from "./mutateState.jsx";
import { withStyles } from '@material-ui/core/styles';

import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

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
                <iframe src={this.state.filename} className="resumeViewer"></iframe>
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
  
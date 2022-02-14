import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

//Adapted from https://github.com/wonism/react-mail-form

export default class ReactMailForm extends React.Component {
  state = {
    title: '',
    contents: '',
    sentMail: false
  };

  constructor(props) {
    super(props);
    const { to } = this.props;

    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(to)) {
      throw new Error('Invalid email address');
    }
  }

  render() {
    const {
      to,
      className = '',
      titleMaxLength = 50,
      titlePlaceholder = 'Title...',
      contentsRows = 8,
      contentsMaxLength = 500,
      contentsPlaceholder = 'Contents...',
      buttonText = 'Send E-Mail',
    } = this.props;
    const { title, contents, sentMail } = this.state;

    if (sentMail) {
        return (
            <Box className={className}>
                <p>
                    Thank you for the message!
                </p>
                <Button
                    variant="outlined"
                    onClick={() => this.setState({ sentMail: false })}
                >
                    Send Another Message
                </Button>
            </Box>
        );
    } else {
        return (
            <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    type="email"
                    value={title}
                    onChange={this.handleTitle}
                    maxLength={Number(titleMaxLength)}
                    placeholder={titlePlaceholder}
                />
                <br />
                <TextField
                    value={contents}
                    onChange={this.handleContents}
                    rows={Number(contentsRows)}
                    maxLength={Number(contentsMaxLength)}
                    placeholder={contentsPlaceholder}
                    multiline={true}
                    minRows={3}
                />
                <br />
                <Button
                    variant="contained"
                    onClick={() => {
                        window.location.href = `mailto:${to}?subject=${title}&body=${contents}`;
                        this.setState({ sentMail: true });
                    }}
                >
                    {buttonText}
                </Button>

                <p>Note: will open a new window in your preferred email application to send the message.</p>
            </Box>
        );
    }
  }

  handleTitle = e => {
    this.setState({ title: e.target.value });
  };

  handleContents = e => {
    this.setState({ contents: e.target.value });
  };
}
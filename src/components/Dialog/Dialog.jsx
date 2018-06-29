import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class BaseDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { dialogTitle, dialogContentText } = this.props;
    const { open } = this.state;

    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        {!!dialogTitle && (
          <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        )}

        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          {this.props.children}
        </DialogContent>

        {/* <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>

          <Button onClick={this.handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions> */}
      </Dialog>
    );
  }
}

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
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { dialogTitle } = this.props;

    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        {!!dialogTitle && (
          <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        )}

        <DialogContent>
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

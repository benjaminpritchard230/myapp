import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function CreateUserDialog({
  createUserDialog,
  setCreateUserDialog,
}) {
  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
  };
  return (
    <div>
      <Dialog open={createUserDialog}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create new user:</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Set username"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Set password"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setCreateUserDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Create user</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

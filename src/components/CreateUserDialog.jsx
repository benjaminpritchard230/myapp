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
import { useDispatch, useSelector } from "react-redux";
import { save } from "../features/token/tokenSlice";
export default function CreateUserDialog({
  createUserDialog,
  setCreateUserDialog,
  updateTasks,
}) {
  const createUserUrl = "http://localhost:8000/register/";
  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    let username = e.target[0].value;
    let password = e.target[1].value;
    axios
      .post(createUserUrl, { username: username, password: password })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        updateTasks();
        setCreateUserDialog(false);
      });
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

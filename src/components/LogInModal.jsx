import * as React from "react";
import { useState } from "react";
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
import { useContext } from "react";
import { UrlContext } from "../context/UrlContext";

export default function LogInModal({
  update,
  setUpdate,
  logInDialog,
  setLogInDialog,
  setCurrentUser,
}) {
  const dispatch = useDispatch();
  const urlList = useContext(UrlContext);

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    setLogInDialog(false);
    let username = e.target[0].value;
    let password = e.target[1].value;
    axios
      .post(urlList.login, {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        dispatch(save(response.data.token));
        setUpdate(update + 1);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setCurrentUser(username);
      });
  };

  return (
    <div>
      <Dialog open={logInDialog}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Enter login details:</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setLogInDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Login</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

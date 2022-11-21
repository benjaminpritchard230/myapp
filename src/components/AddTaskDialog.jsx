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
import { useContext } from "react";
import { UrlContext } from "../context/UrlContext";

export default function AddTaskDialog({
  taskDialog,
  setTaskDialog,
  update,
  setUpdate,
  updateTasks,
}) {
  const urlList = useContext(UrlContext);
  const token = useSelector((state) => state.token.value);
  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    setTaskDialog(false);
    let name = e.target[0].value;
    axios
      .post(
        urlList.tasks,
        { name: name, description: "Hello" },
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        updateTasks();
      });
  };
  return (
    <div>
      <Dialog open={taskDialog}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Enter task name</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Task name"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setTaskDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Create task</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

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


export default function AddTaskDialog({ taskDialog, setTaskDialog, update, setUpdate }) {
    const addTaskUrl = "http://localhost:8000/tasks/"
    const token = "78b5ff3cdd9a2472636fe3e679295510ef829916"

  const handleSubmit = (e) => {
    console.log(e)
    e.preventDefault();
    setTaskDialog(false);
    let name = e.target[0].value
    axios.post(addTaskUrl,{name:name, description:"Hello"}, {
  headers: {
    'Authorization': `token ${token}`
  }, 
})
      .then((response) => {
        console.log(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
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
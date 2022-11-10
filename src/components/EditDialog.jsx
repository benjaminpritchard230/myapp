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

export default function EditDialog({
  task,
  token,
  updateTasks,
  editDialog,
  setEditDialog,
}) {
  const editTaskUrl = `http://localhost:8000/tasks/${task.id}/`;

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    setEditDialog(false);
    let name = e.target[0].value;
    axios
      .put(
        editTaskUrl,
        { name: name, description: "edited" },
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
      <Dialog open={editDialog}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Enter a new name for "{task.name}":</DialogTitle>
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
                setEditDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Edit task</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

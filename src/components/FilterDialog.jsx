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
export default function FilterDialog({
  filterDialog,
  setFilterDialog,
  filterText,
  setFilterText,
}) {
  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    setFilterText(e.target[0].value);
    setFilterDialog(false);
  };
  return (
    <div>
      <Dialog open={filterDialog}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Filter tasks by name:</DialogTitle>
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
                setFilterDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Filter</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

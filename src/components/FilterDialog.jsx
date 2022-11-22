import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Snackbar } from "@mui/material";

export default function FilterDialog({
  filterDialog,
  setFilterDialog,
  filterText,
  setFilterText,
}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    setFilterText(e.target[0].value);
    setFilterDialog(false);
    setOpen(true);
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
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={`Filtering tasks by: "${filterText}"`}
      />
    </div>
  );
}

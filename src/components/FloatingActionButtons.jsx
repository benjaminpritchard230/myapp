import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import Tooltip from "@mui/material/Tooltip";
export default function FloatingActionButtons({
  token,
  taskDialog,
  setTaskDialog,
  logInDialog,
  setLogInDialog,
}) {
  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }} style={style}>
      <Tooltip title="Add task">
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {
            if (token.length > 0) {
              setTaskDialog(true);
            } else {
              setLogInDialog(true);
            }
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Filter tasks">
        <Fab
          aria-label="filter"
          onClick={() => {
            console.log("clicked");
          }}
        >
          <FilterAltIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
}

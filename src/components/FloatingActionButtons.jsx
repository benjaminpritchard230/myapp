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
  filterDialog,
  setFilterDialog,
  filterText,
  setFilterText,
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
      {token.length > 0 ? (
        <Tooltip
          title={filterText.length > 0 ? "Clear filter" : "Filter tasks"}
        >
          {filterText.length > 0 ? (
            <Fab
              aria-label="filter"
              onClick={() => {
                setFilterText("");
              }}
            >
              <FilterAltOffIcon />
            </Fab>
          ) : (
            <Fab
              aria-label="filter"
              onClick={() => {
                setFilterDialog(true);
              }}
            >
              <FilterAltIcon />
            </Fab>
          )}
        </Tooltip>
      ) : null}
    </Box>
  );
}

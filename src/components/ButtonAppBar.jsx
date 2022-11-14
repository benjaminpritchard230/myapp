import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { save } from "../features/token/tokenSlice";
export default function ButtonAppBar({
  update,
  setUpdate,
  logInDialog,
  setLogInDialog,
  updateTasks,
  createUserDialog,
  setCreateUserDialog,
  currentUser,
  setCurrentUser,
}) {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token.value);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentUser.length > 0
              ? `Logged in as: ${currentUser}`
              : "Log in or create a user to get started"}
          </Typography>
          {token.length > 0 ? (
            <Button
              onClick={() => {
                dispatch(save(""));
                updateTasks();
                setCurrentUser("");
              }}
              color="inherit"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch(save(""));
                setLogInDialog(true);
              }}
              color="inherit"
            >
              Login
            </Button>
          )}
          {token.length > 0 ? (
            ""
          ) : (
            <Button
              onClick={() => {
                setCreateUserDialog(true);
              }}
              color="inherit"
            >
              Create user
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { save } from "../features/token/tokenSlice";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Tooltip from "@mui/material/Tooltip";
import { useContext } from "react";
import { UrlContext } from "../context/UrlContext";
import { useState } from "react";
import { Snackbar } from "@mui/material";

export default function ButtonAppBar({
  setLogInDialog,
  updateTasks,
  setCreateUserDialog,
  currentUser,
  setCurrentUser,
  theme,
  setTheme,
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const token = useSelector((state) => state.token.value);
  const message = useContext(UrlContext);
  console.log(message);

  const handleLogoutClick = () => {
    dispatch(save(""));
    updateTasks();
    setCurrentUser("");
    setOpen(true);
  };

  const handleLoginClick = () => {
    dispatch(save(""));
    setLogInDialog(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>

          {theme === "dark" ? (
            <Tooltip title="Light mode" placement="left">
              <IconButton
                onClick={() => {
                  setTheme("light");
                }}
              >
                <Brightness7Icon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Dark mode" placement="left">
              <IconButton
                onClick={() => {
                  setTheme("dark");
                }}
              >
                <Brightness4Icon />
              </IconButton>
            </Tooltip>
          )}
          {token.length > 0 ? (
            <Tooltip title={`Logged in as: ${currentUser}`}>
              <Button
                onClick={() => {
                  handleLogoutClick();
                }}
                color="inherit"
              >
                Logout
              </Button>
            </Tooltip>
          ) : (
            <Button
              onClick={() => {
                handleLoginClick();
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
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Logged out"
        sx={{ bottom: { xs: 90, sm: 0 } }}
      />
    </Box>
  );
}

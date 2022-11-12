import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function ButtonAppBar({
  token,
  setToken,
  update,
  setUpdate,
  logInDialog,
  setLogInDialog,
  updateTasks,
  createUserDialog,
  setCreateUserDialog,
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {token}
          </Typography>
          {token.length > 0 ? (
            <Button
              onClick={() => {
                setToken("");
                updateTasks();
              }}
              color="inherit"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => {
                setToken("");
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

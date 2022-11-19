import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import CreateUserDialog from "./components/CreateUserDialog";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TaskCard from "./components/TaskCard";
import FloatingActionButtons from "./components/FloatingActionButtons";
import axios from "axios";
import AddTaskDialog from "./components/AddTaskDialog";
import LogInModal from "./components/LogInModal";
import ButtonAppBar from "./components/ButtonAppBar";
import FilterDialog from "./components/FilterDialog";
import { useDispatch, useSelector } from "react-redux";
import { save } from "./features/token/tokenSlice";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import { v4 as uuidv4 } from "uuid";

import { motion, AnimatePresence } from "framer-motion";
function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#0057b7",
      },
    },
  });
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.value);
  const [taskList, setTaskList] = useState([]);
  const [taskDialog, setTaskDialog] = useState(false);
  const [logInDialog, setLogInDialog] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [createUserDialog, setCreateUserDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [filterDialog, setFilterDialog] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [filteredTaskList, setFilteredTaskList] = useState([]);
  const [theme, setTheme] = useState("light");

  const [update, setUpdate] = useState(0);

  // useEffect(() => {
  //   if(token.length===0){setLogInDialog(true);
  //   setTaskList([])}
  // }, [update])

  const updateTasks = () => {
    if (token.length > 0) {
      axios
        .get("http://localhost:8000/tasks/", {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setTaskList(response.data);
          setUpdate(update + 1);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    } else {
      setTaskList([]);
    }
  };

  useEffect(() => {
    updateTasks();
  }, [token]);

  useEffect(() => {
    const filtered = taskList.filter((task) => {
      return task.name.toLowerCase().includes(filterText.toLowerCase());
    });
    setFilteredTaskList(filtered);
  }, [filterText, taskList]);

  const displayFilteredTasks = () => {
    if (token.length > 0) {
      return filteredTaskList.map((task) => (
        <TaskCard task={task} updateTasks={updateTasks} key={task.id} />
      ));
    }
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minWidth: 1 }} key="1">
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <ButtonAppBar
              update={update}
              setUpdate={setUpdate}
              logInDialog={logInDialog}
              setLogInDialog={setLogInDialog}
              updateTasks={updateTasks}
              createUserDialog={createUserDialog}
              setCreateUserDialog={setCreateUserDialog}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              theme={theme}
              setTheme={setTheme}
            />
          </Grid>

          {displayFilteredTasks()}
        </Grid>
      </Box>
      <FloatingActionButtons
        taskDialog={taskDialog}
        setTaskDialog={setTaskDialog}
        logInDialog={logInDialog}
        setLogInDialog={setLogInDialog}
        filterDialog={filterDialog}
        setFilterDialog={setFilterDialog}
        filterText={filterText}
        setFilterText={setFilterText}
      />
      <AddTaskDialog
        taskDialog={taskDialog}
        setTaskDialog={setTaskDialog}
        update={update}
        setUpdate={setUpdate}
        updateTasks={updateTasks}
      />
      <LogInModal
        update={update}
        setUpdate={setUpdate}
        logInDialog={logInDialog}
        setLogInDialog={setLogInDialog}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <CreateUserDialog
        createUserDialog={createUserDialog}
        setCreateUserDialog={setCreateUserDialog}
        updateTasks={updateTasks}
      />
      <FilterDialog
        filterDialog={filterDialog}
        setFilterDialog={setFilterDialog}
        filterText={filterText}
        setFilterText={setFilterText}
      />
    </ThemeProvider>
  );
}

export default App;

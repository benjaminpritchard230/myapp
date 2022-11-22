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
import LoginDialog from "./components/LoginDialog";
import ButtonAppBar from "./components/ButtonAppBar";
import FilterDialog from "./components/FilterDialog";
import { useSelector } from "react-redux";
import { UrlContext } from "./context/UrlContext";

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
  const token = useSelector((state) => state.token.value);
  const [taskList, setTaskList] = useState([]);
  const [taskDialog, setTaskDialog] = useState(false);
  const [logInDialog, setLogInDialog] = useState(false);
  const [createUserDialog, setCreateUserDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [filterDialog, setFilterDialog] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [filteredTaskList, setFilteredTaskList] = useState([]);
  const [theme, setTheme] = useState("light");
  const [update, setUpdate] = useState(0);

  const urlList = {
    tasks: "http://localhost:8000/api/tasks/",
    register: "http://localhost:8000/api/register/",
    login: "http://localhost:8000/api/login/",
  };

  const updateTasks = () => {
    if (token.length > 0) {
      axios
        .get(urlList.tasks, {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <UrlContext.Provider value={urlList}>
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1, minWidth: 1 }} key="1">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <ButtonAppBar
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
          setTaskDialog={setTaskDialog}
          setLogInDialog={setLogInDialog}
          setFilterDialog={setFilterDialog}
          filterText={filterText}
          setFilterText={setFilterText}
        />
        <AddTaskDialog
          taskDialog={taskDialog}
          setTaskDialog={setTaskDialog}
          updateTasks={updateTasks}
        />
        <LoginDialog
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
    </UrlContext.Provider>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TaskCard from "./components/TaskCard";
import FloatingActionButtons from './components/FloatingActionButtons';
import axios from "axios";
import AddTaskDialog from './components/AddTaskDialog';
import LogInModal from './components/LogInModal';
import ButtonAppBar from './components/ButtonAppBar';

function App() {
  const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#0057b7",
      },
    },
  });

  const [taskList, setTaskList] = useState([])
  const [taskDialog, setTaskDialog] = useState(false)
  const [logInDialog, setLogInDialog] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const [token, setToken] = useState("")

  const [update, setUpdate] = useState(0)

  useEffect(() => {
    if(token.length===0){setLogInDialog(true);
    setTaskList([])}
  }, [update])
  

  useEffect(() => {
    if(token.length>0){ axios.get('http://localhost:8000/tasks/', {
  headers: {
    'Authorization': `token ${token}`
  }
})
      .then((response) => {
        console.log(response.data);
        setTaskList(response.data);
        setUpdate(update+1)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});}
   
  }, [update]);
  

  const displayTasks = ()=>{
    return taskList.map((task) => (
      <TaskCard
        task={task}
      />
    ));
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minWidth: 1 }} key="1">
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <ButtonAppBar token={token} setToken={setToken} update={update} setUpdate={setUpdate}/>
          </Grid>
          {displayTasks()}
          
        </Grid>
      </Box>
      <FloatingActionButtons taskDialog={taskDialog} setTaskDialog={setTaskDialog}/>
          <AddTaskDialog taskDialog={taskDialog} setTaskDialog={setTaskDialog} update={update} setUpdate={setUpdate}/>
          <LogInModal token={token} setToken={setToken} update={update} setUpdate={setUpdate} logInDialog={logInDialog} setLogInDialog={setLogInDialog}/>
      
    </ThemeProvider>
  );
}

export default App;

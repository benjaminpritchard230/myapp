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

  const token = "78b5ff3cdd9a2472636fe3e679295510ef829916"

  useEffect(() => {
    axios.get('http://localhost:8000/tasks/', {
  headers: {
    'Authorization': `token ${token}`
  }
})
      .then((response) => {
        console.log(response.data);
        setTaskList(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, []);
  

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
            
          </Grid>
          {displayTasks()}
        </Grid>
      </Box>
      <FloatingActionButtons taskDialog={taskDialog} setTaskDialog={setTaskDialog}/>
          <AddTaskDialog taskDialog={taskDialog} setTaskDialog={setTaskDialog}/>
      
    </ThemeProvider>
  );
}

export default App;

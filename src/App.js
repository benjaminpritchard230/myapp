import logo from './logo.svg';
import './App.css';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TaskCard from "./components/TaskCard";

function App() {
  const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#0057b7",
      },
    },
  });

  const [taskList, setTaskList] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/tasks/')
  .then((response) => response.json())
  .then((data) => setTaskList(data));
  }, [])
  

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
          
      
    </ThemeProvider>
  );
}

export default App;

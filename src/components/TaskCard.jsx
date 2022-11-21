import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TaskCardButtons from "./TaskCardButtons";
import EditDialog from "./EditDialog";
import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useContext } from "react";
import { UrlContext } from "../context/UrlContext";

export default function TaskCard({ task, updateTasks }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const token = useSelector((state) => state.token.value);

  const [editDialog, setEditDialog] = useState(false);

  const taskName = task.name;
  const taskDone = task.done;
  const urlList = useContext(UrlContext);
  console.log(urlList.tasks + `${task.id}/`);

  const capitalizeString = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleDeleteClick = () => {
    axios
      .delete(urlList.tasks + `${task.id}/`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        updateTasks();
      });
  };

  const handleDoneClick = () => {
    axios
      .put(
        urlList.tasks + `${task.id}/`,
        { name: taskName, done: !taskDone },
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        updateTasks();
      });
  };

  return (
    <Grid
      item
      xs={12}
      md={6}
      lg={4}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        default: {
          duration: 0.6,
          ease: [0, 0.71, 0.2, 1.01],
        },
        scale: {
          type: "spring",
          damping: 5,
          stiffness: 100,
          restDelta: 0.001,
        },
      }}
      key={task.id}
    >
      <Item sx={{ m: 0.5 }}>
        <Card sx={{ minHeight: 150 }}>
          <CardContent sx={{ minHeight: 150 }}>
            <Typography gutterBottom variant="h5" component="div">
              {capitalizeString(task.name)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
          </CardContent>
          <CardActions>
            <TaskCardButtons
              task={task}
              handleDeleteClick={handleDeleteClick}
              setEditDialog={setEditDialog}
              handleDoneClick={handleDoneClick}
            />
          </CardActions>
        </Card>
      </Item>
      <EditDialog
        task={task}
        updateTasks={updateTasks}
        editDialog={editDialog}
        setEditDialog={setEditDialog}
      />
    </Grid>
  );
}

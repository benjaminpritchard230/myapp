import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TaskCardButtons from "./TaskCardButtons";
import EditDialog from "./EditDialog";
import { useState } from "react";

export default function TaskCard({ task, updateTasks, token }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [editDialog, setEditDialog] = useState(false);

  const imageUrl = `localhost:8000${task.image}`;

  const handleDeleteClick = () => {
    axios
      .delete(`http://localhost:8000/tasks/${task.id}`, {
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
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Item sx={{ m: 0.5 }}>
        <Card sx={{ minHeight: 150 }}>
          <CardContent sx={{ minHeight: 150 }}>
            <Typography gutterBottom variant="h5" component="div">
              {task.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
          </CardContent>
          <CardActions>
            <TaskCardButtons
              handleDeleteClick={handleDeleteClick}
              editDialog={editDialog}
              setEditDialog={setEditDialog}
            />
          </CardActions>
        </Card>
      </Item>
      <EditDialog
        task={task}
        editDialog={editDialog}
        setEditDialog={setEditDialog}
        token={token}
        updateTasks={updateTasks}
      />
    </Grid>
  );
}

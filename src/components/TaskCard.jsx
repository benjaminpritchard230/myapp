import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
export default function TaskCard({task}) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const token = "78b5ff3cdd9a2472636fe3e679295510ef829916"
  const imageUrl = `localhost:8000${task.image}`


  const handleDeleteClick=()=>{
    axios.delete(`http://localhost:8000/tasks/${task.id}`, {
  headers: {
    'Authorization': `token ${token}`
  }
})
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Item sx={{ m: 0.5 }}>
    <Card sx={{  minHeight: 150 }}>
      <CardContent sx={{ minHeight: 150 }}>
        <Typography gutterBottom variant="h5" component="div">
          {task.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={()=>{handleDeleteClick()}} size="small">Delete</Button>
        <Button onClick={()=>{console.log(imageUrl)}} size="small">Image url</Button>
      </CardActions>
    </Card>
    </Item>
    </Grid>
  );
}

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";

export default function TaskCard({task}) {

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
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={task.description}
      />
      <CardContent>
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
  );
}

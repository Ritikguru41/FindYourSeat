import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
// import { useSelector } from "react-redux";
import { Link} from "react-router-dom";
 
const MovieItem = ({ title, releaseDate, posterUrl,id,trailerid }) => {
  return (
    <Card
      sx={{
        width: 250,
        height: 400, // Increased height to accommodate the new layout
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <img 
        height={"40%"} // Increased image height
        width="100%" 
        src={posterUrl} 
        alt={title} 
        style={{ borderTopLeftRadius: 5, borderTopRightRadius: 7 }} // Rounded corners for the image
      />
      <CardContent sx={{ flexGrow: 1, padding: 2 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Release Date: {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: 2 }}>
        <Button
        LinkComponent={Link}
          variant="contained"
          fullWidth
          to = {`/booking/${id}`}
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            ":hover": {
              backgroundColor: '#115293',
            },
          }}
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
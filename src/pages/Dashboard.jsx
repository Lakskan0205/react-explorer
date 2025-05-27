import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import img2123 from "../assets/image/2123.jpeg";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setPosts(data);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  useEffect(() => {
    console.log("posts updated:", posts);
  }, [posts]);

  const navigate = useNavigate();

  return (
    <div className="justify-content-around row gap-5 ">
      <h2>Products listing</h2>
      {posts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        posts.slice(0, 80).map((post) => (
          <div
            className="col-auto"
            id={post.id}
            key={post.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea onClick={() => navigate(`/productInfo`)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={post.category.image || img2123}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {post.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
              </CardActions>
            </Card>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;

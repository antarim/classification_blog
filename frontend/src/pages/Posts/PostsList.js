import {useEffect, useState} from "react";
import {CssBaseline} from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import {POSTS_API} from "../../navigation/api-constants";
import PostListItem from "./PostListItem";
import PostsService from "../../services/posts.service";

export default function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(POSTS_API)
      .then(res => setPosts(res.data))
      .catch(err => console.error(err.message));
  }, [])

  function handleDelete(id, index) {
    PostsService.delete(id)
      .then(() => {
        console.log('Success');
        const psts = [...posts]
        psts.splice(index, 1)
        setPosts(psts);
      })
      .catch(err => console.error(err.message));
  }


  return (
    <Grid container spacing={2} sx={{padding: 2}}>
      <CssBaseline/>
      {posts.map((post, index) => (
        <Grid item key={index} xs={12} sm={6} md={6} lg={4}>
          <PostListItem post={post} handleDelete={handleDelete} index={index}/>
        </Grid>
      ))}
    </Grid>
  );
}

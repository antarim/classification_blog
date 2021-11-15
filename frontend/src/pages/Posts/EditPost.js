import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import React, {useEffect, useState} from "react";
import {Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import PostService from "../../services/posts.service";
import {useHistory, useParams} from "react-router-dom";
import {POSTS} from "../../navigation/constants";

function EditPost() {
  const {id} = useParams();
  const history = useHistory();
  const [post, setPost] = useState({title: '', body: ''});

  useEffect(() => {
    PostService.getOne(id)
      .then(res => setPost(res.data))
      .catch(err => console.log(err.message));
  } ,[])

  function handleChange(e) {
    setPost({...post, [e.target.name]: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(post);
    PostService.edit(id, post)
      .then(() => {
        history.push(POSTS);
      })
      .catch(err => console.error(err.message));
  }

  return (
    <Container component="main" maxWidth="xs" sx={{
      marginTop: 8,
    }}>
      <CssBaseline/>
      <Paper variant="outlined">
        <Box
          sx={{
            // marginTop: ,
            paddingX: 2,
            paddingTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            Edit Post
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  label="Title"
                  id="title"
                  name="title"
                  value={post.title}
                  onChange={handleChange}
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  label="Body"
                  id="body"
                  name="body"
                  fullWidth
                  value={post.body}
                  onChange={handleChange}
                  multiline
                  minRows={4}
                  variant="filled"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default EditPost;
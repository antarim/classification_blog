import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import React from "react";
import {Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import PostService from "../../services/posts.service";
import {useHistory} from "react-router-dom";
import {POSTS} from "../../navigation/constants";

function CreatePost() {
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const postData = {
      title: data.get('title'),
      body: data.get('body')
    };
    PostService.create(postData)
      .then(() => {
        history.push(POSTS);
      })
      .catch(err => console.error(err.message));
  }

  return (
    <Container component="main" maxWidth="md" sx={{
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
            Create Post
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{
            width: '100%',
            mt: 1
          }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  label="Title"
                  id="title"
                  name="title"
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
                  multiline
                  minRows={8}
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

export default CreatePost;
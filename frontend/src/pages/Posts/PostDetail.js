import Container from "@mui/material/Container";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Card, CardContent, CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import PostsService from "../../services/posts.service";

function PostDetail() {
  const {id} = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    PostsService.getOne(id)
      .then(res => setPost(res.data))
      .catch(err => console.error(err.message));
  }, [])

  return (
    <Container maxWidth="sm">
      {
        post ? (
          <>
            <Box>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h4">
                    {post.title}
                  </Typography>

                  <Divider/>
                  <Box sx={{
                    display: 'flex',
                    width: "auto",
                    marginTop: "3px",
                    paddingBottom: "5px"
                  }}>
                    <Typography variant="subtitle2">
                      {post.user.username}
                    </Typography>
                    <Box flexGrow={1}/>
                    <Typography variant="caption">
                      {new Date(post.created).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    {post.body}
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            {post.comments.map((comment, index) => (
              <Box key={index} sx={{
                paddingY: 2,
                paddingRight: 3,
                paddingLeft: 1
              }}>
                <Card>
                  <CardContent>

                    <Box sx={{
                      display: 'flex',
                      width: "auto",
                      marginTop: "3px",
                    }}>
                      <Typography variant="subtitle2">
                        {comment.user.username}
                      </Typography>
                      <Box flexGrow={1}/>
                      <Typography variant="caption">
                        {new Date(post.created).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Divider/>
                    <Typography variant="body1">
                      {comment.body}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </>
        ) : (<CircularProgress/>)
      }
    </Container>
  );
}

export default PostDetail;
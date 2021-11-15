import {Card, CardActionArea, CardActions, CardContent, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import {EDIT_POST, POSTS, ROOT} from "../../navigation/constants";
import {useSelector} from "react-redux";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


function PostListItem({post, handleDelete, index}) {
  const user = useSelector((store) => store.auth.user);

  function onDelete(){
    handleDelete(post.id, index);
  }

  return (
    // Add link to post
    <Card>
      <CardActionArea disableRipple component={Link} to={POSTS + post.id}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="subtitle2">
            {post.user.username}
          </Typography>
          <Typography variant="subtitle2">
            Category: {post.theme}
          </Typography>
          <Divider/>
          <Box sx={{
            width: "auto",
            marginTop: "3px",
          }}>
            <Typography variant="caption" sx={{
              backgroundColor: "rgba(230,213,89,0.6)",
              padding: "3px",
              borderRadius: "6px"
            }}>
              {new Date(post.created).toLocaleDateString()}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>

      {(user && (user.is_staff || user.id === post.owner)) && (
        <CardActions>
          <Box
            sx={{
              display: 'flex',
              width: "100%",
            }}
          >
            <Box flexGrow={1}/>
            <IconButton disableRipple component={Link} to={EDIT_POST + post.id}>
              <EditIcon/>
            </IconButton>
            <IconButton disableRipple onClick={onDelete}>
              <DeleteIcon/>
            </IconButton>
          </Box>
        </CardActions>
      )}
    </Card>

  );
}

export default PostListItem;
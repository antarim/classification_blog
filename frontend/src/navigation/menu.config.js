import {CREATE_POST, POSTS} from "./constants";
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';

const menuConfig = [
  {
    to: POSTS,
    text: "Posts",
    icon: <DashboardIcon/>
  },
  {
    to: CREATE_POST,
    text: "Create post",
    icon: <AddIcon/>,
  },
  // {
  //   to: POSTS,
  //   text: "Posts",
  //   icon: <DashboardIcon/>
  // }
];

export default menuConfig;
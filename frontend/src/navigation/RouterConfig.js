import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {CREATE_POST, EDIT_POST, LOGIN, POSTS, ROOT, SIGN_IN, SIGN_UP} from "./constants";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import PostsList from "../pages/Posts/PostsList";
import Layout from "../components/Layout";
import PostDetail from "../pages/Posts/PostDetail";
import CreatePost from "../pages/Posts/CreatePost";
import EditPost from "../pages/Posts/EditPost";
import PrivateRoute from "./PrivateRoute";

export default function RouterConfig() {
  return (
    <Switch>
      <Route exact path={SIGN_IN} component={SignIn}/>
      <Route exact path={SIGN_UP} component={SignUp}/>
      <Route exact path={POSTS + ':id'} children={<Layout component={PostDetail}/>}/>
      <Route exact path={POSTS} children={<Layout component={PostsList}/>}/>
      <PrivateRoute exact path={CREATE_POST} children={<Layout component={CreatePost}/>}/>
      <PrivateRoute exact path={EDIT_POST + ':id'} children={<Layout component={EditPost}/>}/>

      <Route exact path={ROOT}>
        <Redirect to={POSTS}/>
      </Route>

      <Route path="*">
        <NotFound/>
      </Route>
    </Switch>
  );
}
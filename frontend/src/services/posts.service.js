import axios from "axios";
import {POSTS_API} from "../navigation/api-constants";
import authHeader from "./auth-header";

class PostsService {
  getAll() {
    return axios.get(POSTS_API, {headers: authHeader()});
  }

  getOne(id) {
    return axios.get(POSTS_API + id,{headers: authHeader()});
  }

  create(data) {
    return axios.post(POSTS_API, data, {headers: authHeader()});
  }

  edit(id, data) {
    return axios.put(POSTS_API + id, data, {headers: authHeader()});
  }

  delete(id) {
    return axios.delete(POSTS_API + id, {headers: authHeader()});
  }
}

export default new PostsService();
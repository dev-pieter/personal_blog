import axios from "axios";
import { QueryFunction } from "react-query";
import { config } from "../blog.config";

const base_url = config.blog_api_url;

// interface Post {
//   category: string;
//   heading: string;
//   markdown: string;
//   author: string;
//   img_url: string;
//   views: number;
//   created_at: string;
//   updated_at: string;
//   _id: string;
// }

export const fetchAllPosts = async () => {
  const dailyPosts = axios.get(base_url + "/get_daily").then((res) => {
    return res.data;
  });

  const tutorialPosts = axios.get(base_url + "/get_tutorial").then((res) => {
    return res.data;
  });

  return Promise.all([dailyPosts, tutorialPosts]);
};

export const fetchPostsByCat = async (category) => {
  return axios.get(base_url + `/get_${category}`).then((res) => {
    return res.data;
  });
};

export const fetchPostsById = async (id) => {
  return axios.get(base_url + `/post/${id}`).then((res) => {
    return res.data;
  });
};

import axios from "axios";
import { QueryFunction } from "react-query";
import { config } from "../blog.config";

const base_url = config.blog_api_url;

interface Post {
  category: string;
  heading: string;
  markdown: string;
  author: string;
  img_url: string;
  views: number;
  created_at: string;
  updated_at: string;
  _id: string;
}

export const fetchAllPosts: QueryFunction<Post[][]> = async () => {
  const dailyPosts = axios.get(base_url + "/get_daily").then((res) => {
    return res.data as Post[];
  });

  const tutorialPosts = axios.get(base_url + "/get_tutorial").then((res) => {
    return res.data as Post[];
  });

  return Promise.all([dailyPosts, tutorialPosts]);
};

export const fetchPostsByCat: QueryFunction<Post[]> = async (category: any) => {
  return axios.get(base_url + `/get_${category}`).then((res) => {
    return res.data as Post[];
  });
};

export const fetchPostsById: QueryFunction<Post[]> = async (id: any) => {
  return axios.get(base_url + `/post/${id}`).then((res) => {
    return res.data as Post[];
  });
};

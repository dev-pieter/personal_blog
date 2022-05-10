import { FaGraduationCap } from "react-icons/fa";
import { FiCode } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";

export const config = {
  blog_name: "dev-pieter",
  blog_description: "A blog for programmers.",
  blog_intro: "Welcome to my Developer Blog",
  blog_api_url: "https://api.devpieter.co.za",
  blog_categories: [
    {
      name: "home",
      path: "",
      icon: <AiFillHome />,
    },
    {
      name: "daily-dev",
      path: "daily",
      icon: <FiCode />,
    },
    {
      name: "tutorials",
      path: "tutorial",
      icon: <FaGraduationCap />,
    },
  ],
};

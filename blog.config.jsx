import { FaGraduationCap, FaUser } from "react-icons/fa";
import { FiCode, FiUser } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

export const config = {
  blog_name: "dev-pieter",
  blog_api_url: "https://api.devpieter.co.za",
  author_email: "pieter_nortje@outlook.com",
  author_socials: [
    {
      link: "https://github.com/dev-pieter",
      icon: <FaGithub />,
    },
    {
      link: "https://www.linkedin.com/in/pieternortje",
      icon: <FaLinkedinIn />,
    },
  ],
  blog_categories: [
    {
      name: "home",
      path: "/",
      icon: <AiFillHome />,
    },
    {
      name: "posts",
      path: "/posts",
      icon: <FiCode />,
    },
    {
      name: "my-work",
      path: "/my-work",
      icon: <FiUser />,
    },
  ],
};

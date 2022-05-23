import axios, { AxiosResponse } from "axios";

const gitProfileName = "dev-pieter";
const baseUrl = `https://api.github.com/users/${gitProfileName}`;
const contentBaseUrl = `https://raw.githubusercontent.com/${gitProfileName}`;
// `https://raw.githubusercontent.com/${gitProfileName}/mibrary/version-2.02/README.md`

export interface GHApi {
  fetchGitHubUser: () => Promise<AxiosResponse<GHUser>>;
  fetchGitHubUserRepos: () => Promise<AxiosResponse<GHRepos[]>>;
  fetchGitHubUserReadme: () => Promise<AxiosResponse<string>>;
}

export interface GHUser {
  login: string;
  id: string;
  avatar_url: string;
  url: string;
  html_url: string;
  location: string;
  company: string;
}

export interface GHRepos {
  id: string;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  contents_url: string;
  updated_at: string;
}

const fetchGitHubUser = async (): Promise<AxiosResponse<GHUser>> => {
  return await axios.get(baseUrl, {
    headers: {
      "User-Agent": gitProfileName,
    },
  });
};

const fetchGitHubUserRepos = async (): Promise<AxiosResponse<GHRepos[]>> => {
  return await axios.get(`${baseUrl}/repos`, {
    headers: {
      "User-Agent": gitProfileName,
    },
  });
};

const fetchGitHubUserReadme = async (): Promise<AxiosResponse<string>> => {
  return await axios.get(`${contentBaseUrl}/${gitProfileName}/main/README.md`, {
    headers: {
      "User-Agent": gitProfileName,
    },
  });
};

export const ghApi: GHApi = {
  fetchGitHubUser,
  fetchGitHubUserRepos,
  fetchGitHubUserReadme,
};

// GH User response
// {
//     "login": "dev-pieter",
//     "id": 62051510,
//     "node_id": "MDQ6VXNlcjYyMDUxNTEw",
//     "avatar_url": "https://avatars.githubusercontent.com/u/62051510?v=4",
//     "gravatar_id": "",
//     "url": "https://api.github.com/users/dev-pieter",
//     "html_url": "https://github.com/dev-pieter",
//     "followers_url": "https://api.github.com/users/dev-pieter/followers",
//     "following_url": "https://api.github.com/users/dev-pieter/following{/other_user}",
//     "gists_url": "https://api.github.com/users/dev-pieter/gists{/gist_id}",
//     "starred_url": "https://api.github.com/users/dev-pieter/starred{/owner}{/repo}",
//     "subscriptions_url": "https://api.github.com/users/dev-pieter/subscriptions",
//     "organizations_url": "https://api.github.com/users/dev-pieter/orgs",
//     "repos_url": "https://api.github.com/users/dev-pieter/repos",
//     "events_url": "https://api.github.com/users/dev-pieter/events{/privacy}",
//     "received_events_url": "https://api.github.com/users/dev-pieter/received_events",
//     "type": "User",
//     "site_admin": false,
//     "name": "Pieter Nortje",
//     "company": null,
//     "blog": "https://blog.devpieter.co.za",
//     "location": "Cape Town, South Africa",
//     "email": null,
//     "hireable": null,
//     "bio": null,
//     "twitter_username": null,
//     "public_repos": 10,
//     "public_gists": 0,
//     "followers": 0,
//     "following": 1,
//     "created_at": "2020-03-11T07:46:04Z",
//     "updated_at": "2022-05-17T08:38:12Z"
//   }

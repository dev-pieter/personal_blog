---
title: "GitHub Actions as a CI/CD solution"
description: |
  For all the DevOps gurus out there, this is not a post for you. I am seeking the less experienced. People like me who are fairly skilled in both front and back-end development but leave it up to "the pros" for setting up our production environments and optimising the nitty-gritty. The aim of this post is to "bliss the flames" of what could only be a disastrous CI/CD setup.
date: "22 Jan, 2022"
tags: [Tutorial, GitHub, CI/CD, DevOps]
author: "Pieter Nortje"
category: "tutorials"
slug: "github-actions-as-a-ci-cd-solution"
imageUrl: "https://github.githubassets.com/images/modules/site/features/actions-icon-actions.svg"
---

For all the DevOps gurus out there, this is not a post for you. I am seeking the less experienced. People like me who are fairly skilled in both front and back-end development but leave it up to "the pros" for setting up our production environments and optimising the nitty-gritty. The aim of this post is to "bliss the flames" of what could only be a disastrous CI/CD setup.

![Preventing a disaster](https://media.giphy.com/media/FVHnrgMHQYC4MkNXnZ/giphy.gif)

# **Objectives**

In this post, we'll be exploring:

- What a GitHub Action is
- How to set up a GitHub Workflow
- The concept of "Runners" and how we could use them
- How to set up a GitHub Workflow that builds and serves an application on a self-hosted runner

# **What the hell is a GitHub Action?**

[GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) are scripts that listens to certain triggers and run actions on GitHub repos (like running tests[action] on pull-request[trigger] to see if there are any errors). These scripts are written in yaml, and run on a virtual environment within GitHub.

> I recommend reading up on [GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) for a deeper understanding on what goes on behind the scenes. There is quite a hefty list of things you could do, one of them being Jira Integration.

# **How to set up a GitHub Action**

Let's say we have a repository called **developer-blog**, that contains a simple ReactJS blog. To activate a workflow on a repository we need to create a folder named **.github** and a sub-folder named **workflows** (This will host all our workflows/actions in the form of .yml files)

```
📦 developer-blog
 ┣ 📂 .github
 ┃ ┗ 📂 workflows
 ┃   ┗ 📜 our-workflow.yml
```

Now that we have our folder set up, we can populate **our-workflow.yml** with some yaml jobs:

> Example: Continuous Integration script for triggering tests on pull request to our main branch

```yaml
name: Continuous Integration

# List of triggers (with specified branches)
on:
  pull_request:
    branches:
      - main

  push:
    branches:
      - main
      - "feature/**"

# Jobs to run on above triggers
jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x]

    steps:
      - name: Build and test
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"
      - run: npm ci
      - run: npm run test
      - run: npm run build
```

If you look at the example above, you'll see that we defined the git branches and triggers used to run this workflow. This is essential for differentiating these environments especially in cases where we have multiple workflows (multiple .yml files for different jobs)

That's it! We now have a workflow set up and ready to go.

# **So what can we do with this?**

Do you have a server that's hosting a personal website or project? If yes, there is a super easy way of deploying a new build of your project without having to leave GitHub.

# **Self-hosted GitHub Runners**

GitHub has these things attached to Actions called [self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners). These enable us to register "runners" on our Linux server that listens to our GitHub pull-requests and instead of running the above "jobs" on their virtual environments, we can configure them to run on our hosted server.

Let's say we have a DigitalOcean [droplet](https://www.digitalocean.com/products/droplets) running ubuntu, and we want to build and deploy a standard ReactJS front end to this droplet.

Without a CI/CD pipeline deploying to the server looks like this:

- commit the latest code to the repository
- SSH into the droplet
- pull the recently committed code
- build and test
- serve the build with [pm2](https://pm2.keymetrics.io)

There's a lot of "time wasting" steps there.

The term "Continuous Deployment" always seemed very daunting to me, but turns out it's actually not that big of a mountain to climb with tools like these.

# **Creating a GitHub Runner**

To start things off, we need to add a self-hosted runner by following [these steps](https://docs.github.com/en/actions/hosting-your-own-runners/adding-self-hosted-runners) on GitHub.

> If you want to know how to set up a DigitalOcean droplet and deploy a self-hosted runner to it, you can read up on it [here](https://agency04.com/setting-up-github-runners-on-digitalocean/).

After the runner is set up and ready to listen to our commands (Actions), we can add a file to our workflows directory named **deploy-workflow.yml**, to build and serve our **developer-blog** application with pm2:

```
📦 developer-blog
 ┣ 📂 .github
 ┃ ┗ 📂 workflows
 ┃   ┗ 📜 our-workflow.yml
 ┃   ┗ 📜 deploy-workflow.yml
```

> Example: Continuous Deployment script for building our solution and running it on our server

```yaml
name: Continuous Deployment

on:
  push:
    branches:
      - main

jobs:
  deployment:
    # Here we specify where we run this workflow
    runs-on: self-hosted
    steps:
      # Action to checkout main branch (pull code to runner)
      - name: Checkout main branch
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          node-version: '14.x'

      - name: Install dependencies & build solution
         run: npm ci
         run: npm run build

      # NB: this pm2 application should already be running on your server

      - name: Restart server application
        run: pm2 restart developer-blog
```

And that's it!

A push to our main branch will now trigger the self-hosted runner and the front end will be deployed onto the droplet.

# **Conclusion**

I think we can all agree that this is quite handy for the average developer that's working on a side-project, but It is far from a "production ready" solution. With that said, being able to deploy my code without having to worry about server semantics is something that saves me a lot of time and could potentially do the same for you.

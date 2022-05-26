---
title: "Do you even Data Fetch? (How to use ReactQuery)"
description: |
  This should be considered a "must know" for any Front End engineer. Bringing a web app to life with dynamic data, while maintaining good performance is definitely something of an art. Let's talk about ReactQuery from the TanStack.
date: "25 May, 2022"
tags: [React, Data Fetching, ReactQuery]
author: "Pieter Nortje"
category: "tutorials"
slug: "data-fetching-with-react-query"
repoLink: "https://github.com/dev-pieter/react-query-example"
imageUrl: |
  https://react-query.tanstack.com/_next/static/images/emblem-light-628080660fddb35787ff6c77e97ca43e.svg
---

This should be considered a "must know" for any Front End engineer. Bringing a web app to life with dynamic data, while maintaining good performance is definitely something of an art. Let's talk about ReactQuery from the [TanStack](https://tanstack.com/).

# **Objectives**

In this post, I'll be touching on:

- What is _ReactQuery_ and how to use it
- The concept of _Query Caching_
- How to use "query keys"

# **TL;DR**

First thing's first... As Front End engineers we are all familiar with [axios](https://www.npmjs.com/package/axios) and fetch, so keep in mind that ReactQuery is not an HTTP client, It merely provides a wrapper to support these clients with handy functionality (and does it very well!)

The "functionality" mentioned above, includes stuff like: component state (useState), error handling and query caching. Read the [docs](https://react-query.tanstack.com/overview) if this piques your interest.

# **I like this, give me some examples**

> Note: You can clone the repo from the link beneath the post heading, or follow along with the rest of the post.

Alright. Let's set up a project with _create-react-app_ and initiate ReactQuery:

```bash
~$ npx create-react-app react-query-example && cd react-query-example
```

Then we'll install `react-query` npm package

```bash
~$ npm install react-query --save-dev
```

Open up **src/index.jsx** and import **QueryClient** and **QueryClientProvider** from react-query, so we can wrap our `<App />` component in `<QueryClientProvider />` from the library

```jsx
// In src/index.jsx
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App></App>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

First step done! We can now start using a hook called **useQuery()**. This hook is the bread-and-butter of ReactQuery, and why it's so easy to use.

Let's look at how we can integrate this in our App component:

```jsx
// in src/App.jsx
import { useQuery } from "react-query";

function App() {
  const { isLoading, error, data } = useQuery("queryKey", () =>
    fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
      (res) => res.json()
    )
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}

export default App;
```

That's it. We're up and running!

First thing you should notice, is that we're not using the native React hook **useState()**. This is because all members of the useQuery hook are stateful: **{isLoading, error, data}**. We're handling state and data fetching in one, neatly written function. Pretty awesome!

The second thing that is also quite important is the **useQuery([queryKey], [promiseCallback])** initialisation. As you can see, it takes two arguments: 1. A _query-key_ of type string, and 2. A callback that returns a _promise_ (In our case a generic **http.fetch()** request).

# **Performance is boss. Let's cache**

You've probably been asking: "This is great, but why should I use it?". Let's break down your concerns.

- **"This is great."**: It most certainly is, considering that it's easy to set up, keeps our code clean, handles errors and replaces useState.

- **"Why should I use it?"**: Now this is where it get's interesting. We can utilise something quite powerful that comes with this library, and that, my friend, is **Query Caching**.

> "At its core, React Query manages query caching for you based on query keys. Query keys can be as simple as a string, or as complex as an array of many strings and nested objects. As long as the query key is serializable, and unique to the query's data, you can use it!". [Read more](https://react-query.tanstack.com/guides/query-keys).

# **Using Query Keys**

Let's go back to our App.jsx and look at our **useQuery()** implementation:

```jsx
const { isLoading, error, data } = useQuery("queryKey", () =>
  fetch("https://api.github.com/repos/tannerlinsley/react-query").then((res) =>
    res.json()
  )
);
```

Pay attention to the "queryKey" in the arguments. This allows us to reference a specific query throughout our app, and if it's cached, ReactQuery automatically pulls it from the cache and uses the data for the query.

Let's create a new component called "SampleTable" in **src/components/SampleTable.jsx**:

```jsx
// in src/components/SampleTable.jsx
import { useQuery } from "react-query";

function SampleTable() {
  const { isLoading, error, data } = useQuery("tableData", () =>
    fetch("https://api.example.com/mock-table-data").then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <table>
        <tr>
          <th>Company</th>
          <th>Contact</th>
          <th>Country</th>
        </tr>
        {data.map((row) => (
          <tr>
            <td>{row.companyName}</td>
            <td>{row.contactNumber}</td>
            <td>{row.country}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default SampleTable;
```

Here we've set up a component that fetches data from an API and maps through the data to populate a table. In the **useQuery** initialisation we've defined our _query-key_ as "tableData". Now, whenever we use the "tableData" as query-key, ReactQuery will intelligently go look at our cache to see if there are data attached to that query-key and return that data before making another http request to our API.

If you refresh your browser, you'll see that our table gets populated much quicker at first. This is thanks to "tableData" already existing in our cache.

> If you would like to see more examples, I recommend reading up on ReactQuery's own docs about [caching](https://react-query.tanstack.com/guides/caching). There are a lot more you can do i.t.o. Stale cache and Refetching.

# **Conclusion**

ReactQuery has become my go-to library for data fetching, purely because of how easy it is to implement and surprisingly easy it is to scale too. I recommend giving it a try. You won't look back. (Special thanks to [Tanner Linsley](https://github.com/tannerlinsley), you are a legend! 🤴)

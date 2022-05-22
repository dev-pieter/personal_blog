import Head from "next/head";
import React, { FunctionComponent } from "react";

interface Props {
  description?: string;
  lang?: string;
  meta?: Meta[];
  title: string;
  image?: string;
}

interface Meta {
  name?: string;
  content?: string;
  property?: string;
}

const SEO: FunctionComponent<Props> = ({ description, lang, title, image }) => {
  const metaDescription =
    description ||
    "Welcome to my blog. Browse around, and if you like what you see, get in touch :)";

  const metaTags: Meta[] = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      property: `og:image`,
      content: image,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:image`,
      content: image,
    },
    {
      name: `twitter:creator`,
      content: `Pieter Nortje`,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ];

  return (
    <Head>
      <title>{title} | dev-pieter</title>
      <link rel="icon" href="/site_icon.png" />
      {metaTags.map((tag) => (
        <meta key={tag.name ?? tag.property} {...tag} />
      ))}
    </Head>
  );
};

export default SEO;

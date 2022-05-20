import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

interface Props {
  description?: string;
  lang?: string;
  meta?: [{ name: string; content: string }];
  title: string;
  image?: string;
}

const SEO: FunctionComponent<Props> = ({
  description,
  lang,
  meta,
  title,
  image,
}) => {
  const metaDescription =
    description ||
    "Welcome to my blog. Browse around, and if you like what you see, get in touch :)";

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | Developer Blog`}
      meta={[
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
      ].concat(meta ?? [])}
    />
  );
};

export default SEO;

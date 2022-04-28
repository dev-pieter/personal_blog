import ReactGA from "react-ga";

export const pageViews = (page) => {
  ReactGA.pageview(`${window.location.pathname} - ${page}`);
};

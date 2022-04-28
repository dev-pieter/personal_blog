import ReactGA from "react-ga";

export const pageViews = () => {
  ReactGA.pageview(window.location.pathname);
};
